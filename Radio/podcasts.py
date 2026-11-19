"""Public audio feed adapter for Radio-Feina. No arbitrary feed URLs accepted."""
import datetime
import email.utils
import threading
import time
import urllib.request
import xml.etree.ElementTree as ET

FEEDS = {
    'intelligent-machines': 'https://feeds.twit.tv/twig.xml',
    'practical-ai': 'https://feeds.transistor.fm/practical-ai-machine-learning-data-science-llm',
    'this-week-in-tech': 'https://feeds.twit.tv/twit.xml',
    '99-invisible': 'https://feeds.simplecast.com/BqbsxVfO',
}
_cache = {}
_lock = threading.Lock()


def audio_url(url):
    # Canonical publisher media URLs: keep the original audio and its adverts.
    for host in ('cdn.twit.tv/', 'stitcher.simplecastaudio.com/', 'media.transistor.fm/', 'dovetail.prxu.org/', 'traffic.libsyn.com/', 'traffic.megaphone.fm/'):
        if host in url:
            url = 'https://' + url[url.index(host):]
            break
    if url.startswith('http://open.live.bbc.co.uk/'):
        url = url.replace('http://', 'https://', 1).replace('/proto/http/', '/proto/https/')
    return url


def parse_feed(data):
    tree = ET.fromstring(data)
    episodes = []
    for item in tree.findall('./channel/item'):
        enclosure = item.find('enclosure')
        if enclosure is None:
            continue
        url = audio_url(enclosure.get('url', ''))
        media_type = enclosure.get('type', '')
        if not url.startswith('https://') or (media_type and not media_type.startswith('audio/')):
            continue
        raw_date = item.findtext('pubDate', '')
        try:
            date = email.utils.parsedate_to_datetime(raw_date).isoformat()
        except (TypeError, ValueError):
            date = raw_date
        episodes.append({'title': item.findtext('title', 'Episodi'), 'date': date, 'u': url})
        if len(episodes) == 8:
            break
    if not episodes:
        raise ValueError('El feed no conte episodis d audio publics')
    return episodes


def episodes_for(feed_id):
    if feed_id not in FEEDS:
        raise ValueError('Programa desconegut')
    with _lock:
        cached = _cache.get(feed_id)
        if cached and time.time() - cached[0] < 900:
            return cached[1]
    request = urllib.request.Request(FEEDS[feed_id], headers={'User-Agent': 'Radio-Feina/1.0 (public audio feeds)'})
    with urllib.request.urlopen(request, timeout=12) as response:
        data = response.read(25_000_001)
    if len(data) > 25_000_000:
        raise ValueError('Feed massa gran')
    result = {'ok': True, 'episodis': parse_feed(data), 'actualitzat': datetime.datetime.now(datetime.timezone.utc).isoformat()}
    with _lock:
        _cache[feed_id] = (time.time(), result)
    return result
