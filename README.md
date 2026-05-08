# Sentence Speaker

英文を文単位で読み上げるローカル向け Web アプリ。
ブラウザの Web Speech API を使用するため、サーバー不要で動作します。

## 起動方法

```bash
pnpm install
pnpm dev
```

ブラウザで `http://localhost:5173` を開いてください。

## 機能

- **テキスト入力** — 英文を貼り付けまたは入力
- **文単位の分割** — `.` `?` `!` で自動分割
- **単文再生** — 各文の ▶ ボタンで読み上げ
- **全文連続再生** — Play All ボタンで上から順に再生
- **停止** — Stop ボタンで即時停止
- **再生中ハイライト** — 再生中の文を青く表示・自動スクロール
- **速度調整** — スライダーまたはプリセットボタン（0.5x〜1.5x）
- **進捗表示** — 再生中に「N / M」を表示
- **文番号** — リストに番号を表示
- **データ保存** — テキストと速度設定を localStorage に保存

## キーボードショートカット

| キー | 動作 |
|---|---|
| `Space` | 全文再生 / 停止トグル |
| `→` | 次の文を再生 |
| `←` | 前の文を再生 |

※ テキストエリアにフォーカス中は無効

## 対応ブラウザ

Google Chrome、Microsoft Edge（Web Speech API 対応ブラウザ）

## 既知の制限

- `Mr.` `Dr.` などの一般的な略語は誤分割を防ぐ処理を入れていますが、網羅はしていません
- Chrome でバックグラウンドタブにすると音声が一時停止することがあります

## 技術構成

- [Vite](https://vite.dev/) + [React](https://react.dev/) + TypeScript
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)（`SpeechSynthesis`）
