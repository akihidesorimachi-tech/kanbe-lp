# Claude Code 作業指示

## 最優先の編集対象

- 本番トップLP: `client/src/pages/TopPage.tsx`
- ルーティング: `client/src/App.tsx`
- 全体テーマ: `client/src/index.css`
- tRPC API: `server/routers.ts`

## デザイン規約

和風×武将のLPです。主要配色は、和紙ベージュ `#F5EDD6`、深紺 `#2C3A5A`、金 `#C8A832`、朱 `#8B2020`、オリーブ `#6B7A3A` です。スペースを有効に使い、情報の階層を明確にしてください。4要素のアイコンは以下で固定です。

| 要素 | アイコン |
|---|---|
| 知識 | 📚 |
| 思考力 | 🧠 |
| 経験値 | ⚔️ |
| 情報収集力 | 📡 |

## 実装上の注意

1. 画像は `client/public/assets/` のローカルファイルを参照します。画像URLを外部ストレージURLに戻さないでください。
2. ユーザー提供の人物写真は変更・生成・他人の写真への置換をしないでください。
3. クライアントの声、レビュー、評価、実績を架空で追加しないでください。
4. `map()` のリストでは配列インデックスをReact keyにせず、表示値などの安定キーを使ってください。
5. テキスト・デザインを変更したら `pnpm check`、`pnpm test`、`pnpm build` を実行してください。
6. 金融アドバイスの文言は断定的な投資推奨を避け、個別事情の確認を前提としてください。

## 既存連携

資料請求・予約空き状況(`booking.getBusySlots`)は Google Apps Script (GAS) の Webhook に送信・問い合わせます。GAS_URLは `TopPage.tsx` にあります。

## 移管時に変更した点

- Manus OAuth(ログイン・`useAuth`・`/api/oauth/callback`・`auth.me`/`auth.logout`)は、どのページも認証を必須としていなかったため削除しました(`doctor-lp` と同じ方針)。再度必要になった場合は認証プロバイダを新規に選定してください。
- `server/_core`・`drizzle`・`server/db.ts`・`server/storage.ts`・AIチャット(`AIChatBox.tsx`)・地図(`Map.tsx`)などManus組込み連携に依存する土台は、将来の機能拡張用にコードとして残していますが、現状どのルートからも呼ばれていません。有効化するには対応する外部サービス(DB・LLM・地図API等)の契約と環境変数設定が別途必要です。
- 旧環境の `.project-config.json`(DB接続文字列・JWT_SECRET・Forge APIキーなどの実秘密情報を含んでいた)はリポジトリに含めていません。必要な値は `.env.example` を参照し、新しい値を発行してください。

