"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tesseract_js_1 = require("tesseract.js");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
// Multer configuration for handling form data
const storage = multer_1.default.memoryStorage(); // Use memory storage for handling files
const upload = (0, multer_1.default)({ storage: storage });
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send('Hello, My name is Inigo Montoya');
});
app.post('/parse', upload.fields([
    { name: 'file', maxCount: 1 }, // Handle a single image file
    { name: 'language' } // Handle text data
]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Access the file and text data from the request
    const fileBuffer = (_c = (_b = (_a = req.files) === null || _a === void 0 ? void 0 : _a['file']) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.buffer;
    const languageData = req.body['language'];
    const worker = yield (0, tesseract_js_1.createWorker)(languageData);
    const ret = yield worker.recognize(fileBuffer);
    const data = ret.data.text;
    yield worker.terminate();
    res.json({ data });
}));
app.listen(300, () => 'server running on port 300');
//# sourceMappingURL=server.js.map