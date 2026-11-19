#!/usr/bin/env python3
"""Refresh bundled public podcast episodes for static hosting; run manually."""
import json
from pathlib import Path
from podcasts import episodes_for


def main():
    root = Path(__file__).resolve().parent
    config = json.loads((root / 'programes.json').read_text(encoding='utf-8'))
    updates = {}
    for show in config:
        try:
            updates[show['id']] = episodes_for(show['id'])['episodis']
            print(show['name'] + ': actualitzat')
        except Exception as error:
            print(show['name'] + ': es conserven els episodis anteriors (' + str(error) + ')')
    for path in (root / 'index.html', root / 'dist' / 'index.html'):
        if not path.exists():
            continue
        lines = path.read_text(encoding='utf-8').splitlines(keepends=True)
        for index, line in enumerate(lines):
            if not line.lstrip().startswith('{"n":'):
                continue
            try:
                item = json.loads(line.strip().rstrip(','))
            except ValueError:
                continue
            if item.get('podcast') in updates:
                item['episodis'] = updates[item['podcast']]
                item['u'] = item['episodis'][0]['u']
                suffix = ',' if line.rstrip().endswith(',') else ''
                lines[index] = '  ' + json.dumps(item, ensure_ascii=False) + suffix + '\n'
        path.write_text(''.join(lines), encoding='utf-8')
    return 0 if updates else 1


if __name__ == '__main__':
    raise SystemExit(main())
