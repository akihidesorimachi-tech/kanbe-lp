# 軍師官兵衛FP相談室 TODO

## 基盤設定
- [x] キャラクター画像アップロード
- [x] index.css 和風テーマ設定（深紺・金・朱色、毛筆フォント）
- [x] client/index.html フォント設定
- [x] App.tsx ルーティング設定（lazy load）

## ページ実装
- [x] Home.tsx ランディングページ（官兵衛ビジュアル＋コンセプト紹介）
- [x] LevelPage.tsx レベル診断ページ
- [x] ApplyPage.tsx 申込フォームページ
- [x] BookingPage.tsx 個別相談予約ページ
- [x] SeminarBookingPage.tsx セミナー予約ページ
- [x] FpSeminarBookingPage.tsx FPセミナー予約ページ
- [x] AnswerPage.tsx ANSWERセクション（中級）
- [x] AnswerBeginner.tsx ANSWERセクション（初心者）
- [x] AnswerElementary.tsx ANSWERセクション（初級）
- [x] AnswerAdvanced.tsx ANSWERセクション（上級）
- [x] AnswerComingSoon.tsx ANSWERセクション（準備中）
- [x] NotFound.tsx 404ページ

## AIチャット機能
- [x] server/routers.ts LLMチャットエンドポイント（官兵衛キャラクター）
- [x] KanbeChatBox.tsx 官兵衛スタイルのチャットUI（tRPC経由でLLM接続）

## テスト
- [x] vitest テスト実行（1 passed）

## デザイン改善
- [x] TopPage.tsx 「知識」カードのネスト構造（箱の中に箱）をフラット化（borderBottom区切り線に変更）

## 移管
- [x] Claude Code移管用のソースコード・画像アセット・設定・引き継ぎ資料をZIPにまとめる
