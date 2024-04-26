import { EventEmitter } from 'events';
import { Socket } from 'net';
import { Writable } from 'stream';

// Definitions for Messages.js
export class Messages extends Writable {
  write(chunk: Buffer | string, encoding?: string, callback?: (error?: Error | null) => void): this;
  read(data: Buffer): void;
  reset(): void;
}

// Definitions for message.js
export class Message {
  constructor(buffer?: Buffer);
  int8(val?: number): number;
  int32(val?: number): number;
  str(val?: string): string;
  rawHexStr(val?: string): string;
  getBuff(): Buffer;
}

// Definitions for listen.js
export class Listen extends EventEmitter {
  constructor(port: number);
  destroy(): void;
}

// Definitions for peer/peer.js
export class Peer extends EventEmitter {
  constructor(socket: Socket, peer: PeerInfo);
  transferRequest(file: string, token: string): void;
  setAddress(host: string, port: number): void;
  fileSearchResult(files: any[], token: string, user: string): void;
  destroy(): void;
}

// Definitions for peer/default-peer.js
export class DefaultPeer extends Peer {
  constructor(socket: Socket, peer: PeerInfo);
}

// Definitions for peer/distributed-peer.js
export class DistributedPeer extends Peer {
  constructor(socket: Socket, peer: PeerInfo);
}

// Definitions for share/shared.js
export class Shared extends EventEmitter {
  constructor();
  scanFolder(folder: string): void;
  scan(path: string[]): void;
  search(query: string): any[];
}

// Definitions for slsk-client.js
export class SlskClient extends EventEmitter {
  constructor(serverAddress: ServerAddress, sharedFolders: string[]);
  init(cb: (error?: Error) => void): void;
  connectToPeer(peer: PeerConnection): void;
  login(credentials: Credentials, cb: (error?: Error) => void): void;
  search(obj: SearchObject, cb: (error: Error | null, results?: any[]) => void): void;
  download(obj: DownloadObject, cb: (error?: Error, path?: string) => void, stream?: boolean): void;
  downloadStream(obj: DownloadObject, cb: (error: Error | null, stream?: any) => void): void;
  destroy(): void;
}

// Supporting interfaces
interface PeerInfo {
  user: string;
  type: string;
  token: string;
  host?: string;
  port?: number;
}

interface ServerAddress {
  host: string;
  port: number;
}

interface Credentials {
  user: string;
  pass: string;
  incomingPort?: number;
}

interface SearchObject {
  req: string;
  timeout?: number;
}

interface DownloadObject {
  file: {
    user: string;
    file: string;
    size?: number;
  };
  path?: string;
}

interface PeerConnection {
  user: string;
  host: string;
  port: number;
  token: string;
  type: string;
}
