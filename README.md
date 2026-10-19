# 運動新聞網

網址：https://web14.subsidyking.tw/（備用 https://tommyliu2009.github.io/sports-news/）

每日彙整經濟部及所屬機關（產發署、中小及新創企業署、能源署、國貿署、智慧局、標準局等）新聞稿、公告、補助、標案與預算資訊，提供摘要與原始連結。

## 更新方式
本站與其他五站共用一支更新腳本（每天 4:32 由排程執行）：

- 腳本路徑：`/workspace/localnews/update_all.py`
- 一次更新六站並部署：`python3 /workspace/localnews/update_all.py`
- 只更新本站：`python3 /workspace/localnews/update_all.py 30 --only sports-news`
- 只產生不推送：加 `--no-push`
- 報告：`/workspace/reports/localnews_YYYYMMDD.md`

分類：政策、補助、標案、預算、綜合新聞。摘要附原文連結，不轉載全文。
廣告：仁禾管理顧問／劉靜渡／tommyliu2009@gmail.com／LINE 官方帳號：@891tcxhu
