import '@testing-library/jest-dom';
import { TextEncoder } from 'node:util';
globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
