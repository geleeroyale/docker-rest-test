"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4444;
app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
});
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Health API listening on port ${PORT}`);
});
