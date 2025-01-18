# dmplayground

DECK MAKER さまのページ上で、カードを自由に移動して初動の確認などができる便利スクリプトです。

DEMO: https://zk-phi.github.io/dmplayground/dm/demo

## 使い方
### インストール

1. [このファイル](https://raw.githubusercontent.com/zk-phi/dmplayground/refs/heads/main/release/bookmarklet) の中身をまるごとコピーする

2. ブラウザで適当なページをブックマークに追加する

3. ブックマークを以下のように編集する

  - タイトル：わかりやすい名前 (`DM一人回し` とか) に変える
  - URL：1. でコピーしたスクリプトを貼り付ける

### 起動

1. DECK MAKER さまにアクセス

2. 試したいデッキの編集画面を開く

3. その状態で、 `インストール` で登録したブックマークを押す

## ポリシー

私のスクリプトが関係者に迷惑をかけることは本意ではないので、もしデュエマ / DECK MAKER 公式さまからこういったスクリプトの利用を望まない旨の声明が出されたり、あるいはこういったスクリプトをブロックするような改修が行われた際には、私はこのスクリプトの更新を停止し、公開も中止します。

なお、 DECK MAKER さまの利用規約には「禁止行為」が決められており、

- 第三者もしくは当社に、不利益もしくは損害を与える行為、またはその恐れがある行為。

などの条件が設定されています。

私個人としては、このスクリプトが「不利益もしくは損害を与える」とは考えていませんが、もし私の認識に相違があり、こういったスクリプトの使用が禁止行為に該当すると判断された場合には、利用規約に従って、アカウント停止等の処置が行なわれる可能性がゼロではありません。

このスクリプトを使用したことによって生じた損害について、私は一切の責任を負わないものとします。各自の判断のもとでご利用ください。

## 開発者向け
### Running dev server

Clone this repo and install dependencies:

``` terminal
$ yarn install
```

then run `yarn run dev` to start dev server.

``` terminal
$ yarn run dev
```

### Build and release

Run `yarn run build` to update build artifacts (`./dist`),

``` terminal
$ yarn run build
```

then run `yarn run release` to update `./release/bookmarket`.

``` terminal
$ yarn run release
```

### Dependencies

Released script includes:

- Preact (c) Jason Miller / licensed under the MIT License
- DragDropTouch (c) Bernardo Castilho / licensed under the MIT License

This is a fanmade content of DuelMasters ((C) Wizards of the Coast), and card images are included under the [WotC Fan Content Policy](https://company.wizards.com/en/legal/fancontentpolicy).
