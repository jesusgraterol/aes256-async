# AES-256 Async

The `aes256-async` package allows developers to easily encrypt and decrypt data by making use of the [AES-256](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) specification. It exposes syncrhonous and asynchronous functions to avoid blocking the main thread. Moreover, the secret can be of any size because it is hashed using the [Secure Hash Algorithm 2 (SHA-256)](https://en.wikipedia.org/wiki/SHA-2).





</br>

## Getting Started

Install the package:
```bash
npm install -S aes256-async
```


## Usage

Encrypt and decrypt data asynchronously:

```typescript
import { encrypt, decrypt } from 'aes256-async';

const secret = 'My.$ecreT';

await encrypt(secret, 'Hello world!')
// OrGfQ/91d7p/1BN6Q07Jly5ZK0/7pyczjk5vgw==

await decrypt(secret, 'OrGfQ/91d7p/1BN6Q07Jly5ZK0/7pyczjk5vgw==')
// 'Hello world!'
```


Encrypt and decrypt data synchronously (blocking the main thread):

```typescript
import { encryptSync, decryptSync } from 'aes256-async';

const secret = 'My.$ecreT';

encryptSync(secret, 'Hello world!')
// OrGfQ/91d7p/1BN6Q07Jly5ZK0/7pyczjk5vgw==

decryptSync(secret, 'OrGfQ/91d7p/1BN6Q07Jly5ZK0/7pyczjk5vgw==')
// 'Hello world!'
```





<br/>

## Built With

- TypeScript





<br/>

## Acknowledgements

- [JamesMGreene/node-aes256](https://github.com/JamesMGreene/node-aes256)




<br/>

## Running the Tests

```bash
# integration tests
npm run test:integration

# unit tests
npm run test:unit
```





<br/>

## License

[MIT](https://choosealicense.com/licenses/mit/)





<br/>

## Deployment

Install dependencies:
```bash
npm install
```


Build the library:
```bash
npm start
```


Publish to `npm`:
```bash
npm publish
```
