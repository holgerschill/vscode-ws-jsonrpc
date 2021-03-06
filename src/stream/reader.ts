/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { AbstractMessageReader, DataCallback, StreamMessageReader } from "vscode-jsonrpc/lib/messageReader";
import { ReadableStream } from "./stream";

export abstract class AbstractStreamMessageReader extends AbstractMessageReader {

    abstract listen(callback: DataCallback): void;

    protected readMessage(message: any, callback: DataCallback) {
        const readable = new ReadableStream(message);
        const reader = new StreamMessageReader(readable);
        reader.onError(e => this.fireError(e));
        reader.onClose(() => this.fireClose());
        reader.onPartialMessage(info => this.firePartialMessage(info));
        reader.listen(callback);
    }

}
