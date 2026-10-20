# RedactKit — 개인정보·API 키 자동 마스킹

로컬에서 개인정보와 비밀값을 자동 마스킹하는 Node.js CLI·라이브러리입니다.

## 지원 항목

이메일, 한국 휴대전화, 주민등록번호 형식, 카드번호 형식, IPv4, JWT, AWS/GitHub/OpenAI/Google API 키, private key 블록, JSON의 민감한 키를 처리합니다. `이름:`, `성명:`, `name:` 문맥은 `--names` 옵션으로 마스킹합니다.

글·로그·소스코드·Markdown·JSON은 바로 처리할 수 있습니다. PDF·DOCX·이미지는 내용을 먼저 텍스트로 추출하는 adapter가 필요합니다. OCR 결과도 `maskText()`에 넘기면 같은 규칙으로 처리할 수 있으며, 원본 이미지나 문서를 외부 서비스로 업로드하지 않는 로컬 OCR adapter를 추가하는 것이 다음 확장 지점입니다.

## 사용

```bash
privacy-mask < raw.log > safe.log
privacy-mask --names --file input.txt --out safe.txt
privacy-mask --json < payload.json
```

모든 처리는 로컬에서 수행하며 파일이나 입력을 외부로 전송하지 않습니다. 정규식 기반 도구이므로 주민등록증 사진, 얼굴·음성·필체 같은 비정형 정보와 문맥상 이름은 완벽히 판별하지 못합니다. 결과를 공개하기 전에 직접 검토하세요.

## License

MIT

## Trademark notice

This project is independent and is not affiliated with or endorsed by GitHub, OpenAI, Google, or any other provider. Product names are used only to describe compatible secret formats.

