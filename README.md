# Pokemon GO Index

![logo](frontend/public/logo/TitleLogo.png)

## 本リポジトリについて

本リポジトリは個人用/学習用に作成していた 「Pokémon GO」 の図鑑管理用の非公式 Web アプリケーションのコード部分のみを公開したものになります

具体的には現在開催されている(将来開催される)イベントや，ロケット団の手持ち，フィールドリサーチで手に入るポケモンといった情報と,
現在の自分の図鑑情報を照らし合わせて埋まっていない部分をスムーズに見つけて，図鑑を埋めていけることを目的としています.

## 注意点

- 本リポジトリ内のコード/ドキュメントやその他に付随する 「Pokémon」 および 「Pokémon GO」 に関する全てのコンテンツの著作権および商標権を含む知的財産権は, 当該コンテンツの提供元に帰属します.
- 本リポジトリのコードを改変/利用/流用することは自由ですが, コンテンツの著作権は提供元に帰属することに十分に配慮して利用して下さい.

## ローカル環境で動作確認をする

python3.10, node v18 環境があれば以下の手順に従って local の firebase emulator 上で動作確認することができます

### 表示用のデータを Pokemon Go Index API から取得

- local での表示用に必要なデータを [Pokemon GO API](https://pokemon-go-api.github.io/pokemon-go-api/) から取得し，`frontend/public/images/` に保存します.
- 実行しなくても画像が表示されないだけで動作確認をすることはできます.
  - また一部だけ実行しても (途中で打ち切っても) 問題ありません.
  - 再度実行する場合も既に取得したデータは再取得はされません.
- 環境にもよりますが 10分前後程度の時間がかかります.

```bash
$generate_data
> poetry install
> poetry run python generate_image.py
```

### エミュレータ & Next.js の実行

```bash
$frontend
> yarn install
> yarn emulator
```

をした上で

```bash
$frontend
> yarn dev
```

- web: <http://127.0.0.1:3000/>
- emulator: <http://127.0.0.1:4000/>

emulator 用のデータ (auth 含む) は `frontend/.data` に永続化されており，ある程度動作確認用のデータが入っていますのでご自由にお使い下さい

## その他

- ポケモンの画像データなど一部の情報は [Pokemon GO API](https://pokemon-go-api.github.io/pokemon-go-api/) から取得したデータを利用しています.
- 本リポジトリに関する問い合わせ先 : <pokemon.go.index.web@gmail.com> もしくは owner の GitHub Account 宛に何らかのアクションを下さい
