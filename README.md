SET DEBUG=js-project:*; pnpm dev

generate secret with crypto
require('crypto').randomBytes(16).toString('hex')
