# 《変換 -Palette Converter-》 version 4.X series
* FEAR社のTRPGシステム、ビーストバインドトリニティ（以下BBT）用のキャラクターシートから、チャットパレット用テキストデータやオンラインセッション用ツール向けの駒データを生成するツールです。
* 2.3.0公開後に一旦開発を終了したのですが、BBTの電子書籍化やオンラインセッション用ツールの更新が重なり、自身の体調も回復してきたことから、Vue.jsの勉強も兼ねてリメイクを行いました。

## 使用方法
* キャラクターシート倉庫( http://character-sheets.appspot.com/bbt/ )の、対応するキャラクターシートのURLをコピーしておいてください。
* ページの「URL」欄にコピーしたURLをペースト、使用したいオンラインセッションツールにあわせて「ツール指定」を選択。使用予定のツールが一覧にない場合は「なし」にしてください。
* 「チャットパレット出力」ボタンをクリック／タップで、指定したツールに合わせたチャットパレットが出力されます。
* 「ユドナリウム（派生ツール含む）」「ココフォリア」を選択している場合、さらにキャラクター駒の出力も行えます。画面を下にスクロールし、駒に紐づけるパラメータを確認のうえ操作を行ってください。

## 対応オンラインセッションツール
その他のオンラインセッションツールについては、情報をいただければ対応を検討いたします。
- ココフォリア
- ユドナリウム
- ユドナリウムリリィ
- Udonarium with Fly
- **ユドナイト**[New!]
- ユドナリウム（ルビ対応
- TRPGスタジオ
- Tekey
- **ゆとチャadv.**[New!]
- Quoridorn

## 主な変更点
- CSSフレームワークをBootstrap5ベースに変更しました。
- 正規表現まわりを見直しています。
