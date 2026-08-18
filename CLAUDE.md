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

## GitHub Pages公開時の注意(default branch)

このリポジトリは元々コミットが一つもない空リポジトリでした。空リポジトリに対して `main` 以外のブランチ(例: `claude/...`)へ最初に push すると、GitHub はそのブランチを**default branch**として採用してしまいます。その後 `main` に push しても default branch は自動では戻りません(実際、`main` ブランチを後から作成してもdefault branchは `claude/kanbe-lp-restore-publish-58vvia` のままでした)。

GitHub Pagesなど default branch が `main` である前提の機能を使う場合は、次を確認してください。

1. リポジトリの Settings → General → Default branch が `main` になっているか確認し、違えば `main` に変更する(この操作はClaude Codeのツールでは実行できないため、人間が手動で行う必要があります)
2. (すでに `github-pages` 環境が作成されている場合)Settings → Environments → `github-pages` → Deployment branches and tags が `main` を許可しているか確認する

**今後、新規リポジトリを空のまま作らないための予防策**: GitHubで手動作成する場合は「Add a README file」にチェックを入れて作成する。Claude Codeのツール(`create_repository`)で作成する場合は `autoInit: true` を指定する。どちらも最初から `main` に1コミットある状態で始まるため、この問題自体が発生しない。

