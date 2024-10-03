import type {Action, AssetType, NameType} from '@wharfkit/antelope'
import {ABI, Asset, Blob, Name, Struct} from '@wharfkit/antelope'
import type {ActionOptions, ContractArgs, PartialBy, Table} from '@wharfkit/contract'
import {Contract as BaseContract} from '@wharfkit/contract'
export const abiBlob = Blob.from(
    'DmVvc2lvOjphYmkvMS4yAAoHYWNjb3VudAABB2JhbGFuY2UFYXNzZXQFY2xvc2UAAgVvd25lcgRuYW1lBnN5bWJvbAZzeW1ib2wGY3JlYXRlAAIGaXNzdWVyBG5hbWUObWF4aW11bV9zdXBwbHkFYXNzZXQOY3VycmVuY3lfc3RhdHMAAwZzdXBwbHkFYXNzZXQKbWF4X3N1cHBseQVhc3NldAZpc3N1ZXIEbmFtZQVpc3N1ZQADAnRvBG5hbWUIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcKaXNzdWVmaXhlZAADAnRvBG5hbWUGc3VwcGx5BWFzc2V0BG1lbW8Gc3RyaW5nBG9wZW4AAwVvd25lcgRuYW1lBnN5bWJvbAZzeW1ib2wJcmFtX3BheWVyBG5hbWUGcmV0aXJlAAIIcXVhbnRpdHkFYXNzZXQEbWVtbwZzdHJpbmcMc2V0bWF4c3VwcGx5AAIGaXNzdWVyBG5hbWUObWF4aW11bV9zdXBwbHkFYXNzZXQIdHJhbnNmZXIABARmcm9tBG5hbWUCdG8EbmFtZQhxdWFudGl0eQVhc3NldARtZW1vBnN0cmluZwgAAAAAAIVpRAVjbG9zZfkDLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQ2xvc2UgVG9rZW4gQmFsYW5jZQpzdW1tYXJ5OiAnQ2xvc2Uge3tub3dyYXAgb3duZXJ9feKAmXMgemVybyBxdWFudGl0eSBiYWxhbmNlJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdG9rZW4ucG5nIzIwN2ZmNjhiMDQwNmVhYTU2NjE4YjA4YmRhODFkNmEwOTU0NTQzZjM2YWRjMzI4YWIzMDY1ZjMxYTVjNWQ2NTQKLS0tCgp7e293bmVyfX0gYWdyZWVzIHRvIGNsb3NlIHRoZWlyIHplcm8gcXVhbnRpdHkgYmFsYW5jZSBmb3IgdGhlIHt7c3ltYm9sX3RvX3N5bWJvbF9jb2RlIHN5bWJvbH19IHRva2VuLgoKUkFNIHdpbGwgYmUgcmVmdW5kZWQgdG8gdGhlIFJBTSBwYXllciBvZiB0aGUge3tzeW1ib2xfdG9fc3ltYm9sX2NvZGUgc3ltYm9sfX0gdG9rZW4gYmFsYW5jZSBmb3Ige3tvd25lcn19LgAAAACobNRFBmNyZWF0ZZoFLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogQ3JlYXRlIE5ldyBUb2tlbgpzdW1tYXJ5OiAnQ3JlYXRlIGEgbmV3IHRva2VuJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdG9rZW4ucG5nIzIwN2ZmNjhiMDQwNmVhYTU2NjE4YjA4YmRhODFkNmEwOTU0NTQzZjM2YWRjMzI4YWIzMDY1ZjMxYTVjNWQ2NTQKLS0tCgp7eyRhY3Rpb24uYWNjb3VudH19IGFncmVlcyB0byBjcmVhdGUgYSBuZXcgdG9rZW4gd2l0aCBzeW1ib2wge3thc3NldF90b19zeW1ib2xfY29kZSBtYXhpbXVtX3N1cHBseX19IHRvIGJlIG1hbmFnZWQgYnkge3tpc3N1ZXJ9fS4KClRoaXMgYWN0aW9uIHdpbGwgbm90IHJlc3VsdCBhbnkgYW55IHRva2VucyBiZWluZyBpc3N1ZWQgaW50byBjaXJjdWxhdGlvbi4KCnt7aXNzdWVyfX0gd2lsbCBiZSBhbGxvd2VkIHRvIGlzc3VlIHRva2VucyBpbnRvIGNpcmN1bGF0aW9uLCB1cCB0byBhIG1heGltdW0gc3VwcGx5IG9mIHt7bWF4aW11bV9zdXBwbHl9fS4KClJBTSB3aWxsIGRlZHVjdGVkIGZyb20ge3skYWN0aW9uLmFjY291bnR9feKAmXMgcmVzb3VyY2VzIHRvIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IHJlY29yZHMuAAAAAAClMXYFaXNzdWXuBy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IElzc3VlIFRva2VucyBpbnRvIENpcmN1bGF0aW9uCnN1bW1hcnk6ICdJc3N1ZSB7e25vd3JhcCBxdWFudGl0eX19IGludG8gY2lyY3VsYXRpb24gYW5kIHRyYW5zZmVyIGludG8ge3tub3dyYXAgdG99feKAmXMgYWNjb3VudCcKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3Rva2VuLnBuZyMyMDdmZjY4YjA0MDZlYWE1NjYxOGIwOGJkYTgxZDZhMDk1NDU0M2YzNmFkYzMyOGFiMzA2NWYzMWE1YzVkNjU0Ci0tLQoKVGhlIHRva2VuIG1hbmFnZXIgYWdyZWVzIHRvIGlzc3VlIHt7cXVhbnRpdHl9fSBpbnRvIGNpcmN1bGF0aW9uLCBhbmQgdHJhbnNmZXIgaXQgaW50byB7e3RvfX3igJlzIGFjY291bnQuCgp7eyNpZiBtZW1vfX1UaGVyZSBpcyBhIG1lbW8gYXR0YWNoZWQgdG8gdGhlIHRyYW5zZmVyIHN0YXRpbmc6Cnt7bWVtb319Cnt7L2lmfX0KCklmIHt7dG99fSBkb2VzIG5vdCBoYXZlIGEgYmFsYW5jZSBmb3Ige3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19LCBvciB0aGUgdG9rZW4gbWFuYWdlciBkb2VzIG5vdCBoYXZlIGEgYmFsYW5jZSBmb3Ige3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19LCB0aGUgdG9rZW4gbWFuYWdlciB3aWxsIGJlIGRlc2lnbmF0ZWQgYXMgdGhlIFJBTSBwYXllciBvZiB0aGUge3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19IHRva2VuIGJhbGFuY2UgZm9yIHt7dG99fS4gQXMgYSByZXN1bHQsIFJBTSB3aWxsIGJlIGRlZHVjdGVkIGZyb20gdGhlIHRva2VuIG1hbmFnZXLigJlzIHJlc291cmNlcyB0byBjcmVhdGUgdGhlIG5lY2Vzc2FyeSByZWNvcmRzLgoKVGhpcyBhY3Rpb24gZG9lcyBub3QgYWxsb3cgdGhlIHRvdGFsIHF1YW50aXR5IHRvIGV4Y2VlZCB0aGUgbWF4IGFsbG93ZWQgc3VwcGx5IG9mIHRoZSB0b2tlbi4AQFLdLaUxdgppc3N1ZWZpeGVkoQgtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBJc3N1ZSBGaXhlZCBTdXBwbHkgb2YgVG9rZW5zIGludG8gQ2lyY3VsYXRpb24Kc3VtbWFyeTogJ0lzc3VlIHVwIHRvIHt7bm93cmFwIHN1cHBseX19IHN1cHBseSBpbnRvIGNpcmN1bGF0aW9uIGFuZCB0cmFuc2ZlciBpbnRvIHt7bm93cmFwIHRvfX3igJlzIGFjY291bnQnCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy90b2tlbi5wbmcjMjA3ZmY2OGIwNDA2ZWFhNTY2MThiMDhiZGE4MWQ2YTA5NTQ1NDNmMzZhZGMzMjhhYjMwNjVmMzFhNWM1ZDY1NAotLS0KClRoZSB0b2tlbiBtYW5hZ2VyIGFncmVlcyB0byBpc3N1ZSB0b2tlbnMgdXAgdG8ge3tzdXBwbHl9fSBmaXhlZCBzdXBwbHkgaW50byBjaXJjdWxhdGlvbiwgYW5kIHRyYW5zZmVyIGl0IGludG8ge3t0b3194oCZcyBhY2NvdW50LgoKe3sjaWYgbWVtb319VGhlcmUgaXMgYSBtZW1vIGF0dGFjaGVkIHRvIHRoZSB0cmFuc2ZlciBzdGF0aW5nOgp7e21lbW99fQp7ey9pZn19CgpJZiB7e3RvfX0gZG9lcyBub3QgaGF2ZSBhIGJhbGFuY2UgZm9yIHt7YXNzZXRfdG9fc3ltYm9sX2NvZGUgcXVhbnRpdHl9fSwgb3IgdGhlIHRva2VuIG1hbmFnZXIgZG9lcyBub3QgaGF2ZSBhIGJhbGFuY2UgZm9yIHt7YXNzZXRfdG9fc3ltYm9sX2NvZGUgcXVhbnRpdHl9fSwgdGhlIHRva2VuIG1hbmFnZXIgd2lsbCBiZSBkZXNpZ25hdGVkIGFzIHRoZSBSQU0gcGF5ZXIgb2YgdGhlIHt7YXNzZXRfdG9fc3ltYm9sX2NvZGUgcXVhbnRpdHl9fSB0b2tlbiBiYWxhbmNlIGZvciB7e3RvfX0uIEFzIGEgcmVzdWx0LCBSQU0gd2lsbCBiZSBkZWR1Y3RlZCBmcm9tIHRoZSB0b2tlbiBtYW5hZ2Vy4oCZcyByZXNvdXJjZXMgdG8gY3JlYXRlIHRoZSBuZWNlc3NhcnkgcmVjb3Jkcy4KClRoaXMgYWN0aW9uIGRvZXMgbm90IGFsbG93IHRoZSB0b3RhbCBxdWFudGl0eSB0byBleGNlZWQgdGhlIG1heCBhbGxvd2VkIHN1cHBseSBvZiB0aGUgdG9rZW4uAAAAAAAwVaUEb3BlbsYFLS0tCnNwZWNfdmVyc2lvbjogIjAuMi4wIgp0aXRsZTogT3BlbiBUb2tlbiBCYWxhbmNlCnN1bW1hcnk6ICdPcGVuIGEgemVybyBxdWFudGl0eSBiYWxhbmNlIGZvciB7e25vd3JhcCBvd25lcn19JwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdG9rZW4ucG5nIzIwN2ZmNjhiMDQwNmVhYTU2NjE4YjA4YmRhODFkNmEwOTU0NTQzZjM2YWRjMzI4YWIzMDY1ZjMxYTVjNWQ2NTQKLS0tCgp7e3JhbV9wYXllcn19IGFncmVlcyB0byBlc3RhYmxpc2ggYSB6ZXJvIHF1YW50aXR5IGJhbGFuY2UgZm9yIHt7b3duZXJ9fSBmb3IgdGhlIHt7c3ltYm9sX3RvX3N5bWJvbF9jb2RlIHN5bWJvbH19IHRva2VuLgoKSWYge3tvd25lcn19IGRvZXMgbm90IGhhdmUgYSBiYWxhbmNlIGZvciB7e3N5bWJvbF90b19zeW1ib2xfY29kZSBzeW1ib2x9fSwge3tyYW1fcGF5ZXJ9fSB3aWxsIGJlIGRlc2lnbmF0ZWQgYXMgdGhlIFJBTSBwYXllciBvZiB0aGUge3tzeW1ib2xfdG9fc3ltYm9sX2NvZGUgc3ltYm9sfX0gdG9rZW4gYmFsYW5jZSBmb3Ige3tvd25lcn19LiBBcyBhIHJlc3VsdCwgUkFNIHdpbGwgYmUgZGVkdWN0ZWQgZnJvbSB7e3JhbV9wYXllcn194oCZcyByZXNvdXJjZXMgdG8gY3JlYXRlIHRoZSBuZWNlc3NhcnkgcmVjb3Jkcy4AAAAAqOuyugZyZXRpcmXcAy0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFJlbW92ZSBUb2tlbnMgZnJvbSBDaXJjdWxhdGlvbgpzdW1tYXJ5OiAnUmVtb3ZlIHt7bm93cmFwIHF1YW50aXR5fX0gZnJvbSBjaXJjdWxhdGlvbicKaWNvbjogaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2Vvc25ldHdvcmtmb3VuZGF0aW9uL2Vvcy1zeXN0ZW0tY29udHJhY3RzL21haW4vY29udHJhY3RzL2ljb25zL3Rva2VuLnBuZyMyMDdmZjY4YjA0MDZlYWE1NjYxOGIwOGJkYTgxZDZhMDk1NDU0M2YzNmFkYzMyOGFiMzA2NWYzMWE1YzVkNjU0Ci0tLQoKVGhlIHRva2VuIG1hbmFnZXIgYWdyZWVzIHRvIHJlbW92ZSB7e3F1YW50aXR5fX0gZnJvbSBjaXJjdWxhdGlvbiwgdGFrZW4gZnJvbSB0aGVpciBvd24gYWNjb3VudC4KCnt7I2lmIG1lbW99fSBUaGVyZSBpcyBhIG1lbW8gYXR0YWNoZWQgdG8gdGhlIGFjdGlvbiBzdGF0aW5nOgp7e21lbW99fQp7ey9pZn194GOtGncjs8IMc2V0bWF4c3VwcGx5wAMtLS0Kc3BlY192ZXJzaW9uOiAiMC4yLjAiCnRpdGxlOiBTZXQgTWF4IFN1cHBseQpzdW1tYXJ5OiAnU2V0IG1heCBzdXBwbHkgZm9yIHRva2VuJwppY29uOiBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vZW9zbmV0d29ya2ZvdW5kYXRpb24vZW9zLXN5c3RlbS1jb250cmFjdHMvbWFpbi9jb250cmFjdHMvaWNvbnMvdG9rZW4ucG5nIzIwN2ZmNjhiMDQwNmVhYTU2NjE4YjA4YmRhODFkNmEwOTU0NTQzZjM2YWRjMzI4YWIzMDY1ZjMxYTVjNWQ2NTQKLS0tCgp7e2lzc3Vlcn19IHdpbGwgYmUgYWxsb3dlZCB0byBpc3N1ZSB0b2tlbnMgaW50byBjaXJjdWxhdGlvbiwgdXAgdG8gYSBtYXhpbXVtIHN1cHBseSBvZiB7e21heGltdW1fc3VwcGx5fX0uCgpUaGlzIGFjdGlvbiB3aWxsIG5vdCByZXN1bHQgYW55IGFueSB0b2tlbnMgYmVpbmcgaXNzdWVkIGludG8gY2lyY3VsYXRpb24uAAAAVy08zc0IdHJhbnNmZXK2By0tLQpzcGVjX3ZlcnNpb246ICIwLjIuMCIKdGl0bGU6IFRyYW5zZmVyIFRva2VucwpzdW1tYXJ5OiAnU2VuZCB7e25vd3JhcCBxdWFudGl0eX19IGZyb20ge3tub3dyYXAgZnJvbX19IHRvIHt7bm93cmFwIHRvfX0nCmljb246IGh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9lb3NuZXR3b3JrZm91bmRhdGlvbi9lb3Mtc3lzdGVtLWNvbnRyYWN0cy9tYWluL2NvbnRyYWN0cy9pY29ucy90cmFuc2Zlci5wbmcjNWRmYWQwZGY3Mjc3MmVlMWNjYzE1NWU2NzBjMWQxMjRmNWM1MTIyZjFkNTAyNzU2NWRmMzhiNDE4MDQyZDFkZAotLS0KCnt7ZnJvbX19IGFncmVlcyB0byBzZW5kIHt7cXVhbnRpdHl9fSB0byB7e3RvfX0uCgp7eyNpZiBtZW1vfX1UaGVyZSBpcyBhIG1lbW8gYXR0YWNoZWQgdG8gdGhlIHRyYW5zZmVyIHN0YXRpbmc6Cnt7bWVtb319Cnt7L2lmfX0KCklmIHt7ZnJvbX19IGlzIG5vdCBhbHJlYWR5IHRoZSBSQU0gcGF5ZXIgb2YgdGhlaXIge3thc3NldF90b19zeW1ib2xfY29kZSBxdWFudGl0eX19IHRva2VuIGJhbGFuY2UsIHt7ZnJvbX19IHdpbGwgYmUgZGVzaWduYXRlZCBhcyBzdWNoLiBBcyBhIHJlc3VsdCwgUkFNIHdpbGwgYmUgZGVkdWN0ZWQgZnJvbSB7e2Zyb219feKAmXMgcmVzb3VyY2VzIHRvIHJlZnVuZCB0aGUgb3JpZ2luYWwgUkFNIHBheWVyLgoKSWYge3t0b319IGRvZXMgbm90IGhhdmUgYSBiYWxhbmNlIGZvciB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIHF1YW50aXR5fX0sIHt7ZnJvbX19IHdpbGwgYmUgZGVzaWduYXRlZCBhcyB0aGUgUkFNIHBheWVyIG9mIHRoZSB7e2Fzc2V0X3RvX3N5bWJvbF9jb2RlIHF1YW50aXR5fX0gdG9rZW4gYmFsYW5jZSBmb3Ige3t0b319LiBBcyBhIHJlc3VsdCwgUkFNIHdpbGwgYmUgZGVkdWN0ZWQgZnJvbSB7e2Zyb219feKAmXMgcmVzb3VyY2VzIHRvIGNyZWF0ZSB0aGUgbmVjZXNzYXJ5IHJlY29yZHMuAgAAADhPTREyA2k2NAAAB2FjY291bnQAAAAAAJBNxgNpNjQAAA5jdXJyZW5jeV9zdGF0cwAAAAAA'
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type('account')
    export class account extends Struct {
        @Struct.field(Asset)
        declare balance: Asset
    }
    @Struct.type('close')
    export class close extends Struct {
        @Struct.field(Name)
        declare owner: Name
        @Struct.field(Asset.Symbol)
        declare symbol: Asset.Symbol
    }
    @Struct.type('create')
    export class create extends Struct {
        @Struct.field(Name)
        declare issuer: Name
        @Struct.field(Asset)
        declare maximum_supply: Asset
    }
    @Struct.type('currency_stats')
    export class currency_stats extends Struct {
        @Struct.field(Asset)
        declare supply: Asset
        @Struct.field(Asset)
        declare max_supply: Asset
        @Struct.field(Name)
        declare issuer: Name
    }
    @Struct.type('issue')
    export class issue extends Struct {
        @Struct.field(Name)
        declare to: Name
        @Struct.field(Asset)
        declare quantity: Asset
        @Struct.field('string')
        declare memo: string
    }
    @Struct.type('issuefixed')
    export class issuefixed extends Struct {
        @Struct.field(Name)
        declare to: Name
        @Struct.field(Asset)
        declare supply: Asset
        @Struct.field('string')
        declare memo: string
    }
    @Struct.type('open')
    export class open extends Struct {
        @Struct.field(Name)
        declare owner: Name
        @Struct.field(Asset.Symbol)
        declare symbol: Asset.Symbol
        @Struct.field(Name)
        declare ram_payer: Name
    }
    @Struct.type('retire')
    export class retire extends Struct {
        @Struct.field(Asset)
        declare quantity: Asset
        @Struct.field('string')
        declare memo: string
    }
    @Struct.type('setmaxsupply')
    export class setmaxsupply extends Struct {
        @Struct.field(Name)
        declare issuer: Name
        @Struct.field(Asset)
        declare maximum_supply: Asset
    }
    @Struct.type('transfer')
    export class transfer extends Struct {
        @Struct.field(Name)
        declare from: Name
        @Struct.field(Name)
        declare to: Name
        @Struct.field(Asset)
        declare quantity: Asset
        @Struct.field('string')
        declare memo: string
    }
}
export const TableMap = {
    accounts: Types.account,
    stat: Types.currency_stats,
}
export interface TableTypes {
    accounts: Types.account
    stat: Types.currency_stats
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {}
    export interface close {
        owner: NameType
        symbol: Asset.SymbolType
    }
    export interface create {
        issuer: NameType
        maximum_supply: AssetType
    }
    export interface issue {
        to: NameType
        quantity: AssetType
        memo: string
    }
    export interface issuefixed {
        to: NameType
        supply: AssetType
        memo: string
    }
    export interface open {
        owner: NameType
        symbol: Asset.SymbolType
        ram_payer: NameType
    }
    export interface retire {
        quantity: AssetType
        memo: string
    }
    export interface setmaxsupply {
        issuer: NameType
        maximum_supply: AssetType
    }
    export interface transfer {
        from: NameType
        to: NameType
        quantity: AssetType
        memo: string
    }
}
export interface ActionNameParams {
    close: ActionParams.close
    create: ActionParams.create
    issue: ActionParams.issue
    issuefixed: ActionParams.issuefixed
    open: ActionParams.open
    retire: ActionParams.retire
    setmaxsupply: ActionParams.setmaxsupply
    transfer: ActionParams.transfer
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
    constructor(args: PartialBy<ContractArgs, 'abi' | 'account'>) {
        super({
            client: args.client,
            abi: abi,
            account: args.account || Name.from('eosio.token'),
        })
    }
    action<T extends ActionNames>(
        name: T,
        data: ActionNameParams[T],
        options?: ActionOptions
    ): Action {
        return super.action(name, data, options)
    }
    table<T extends TableNames>(name: T, scope?: NameType): Table<RowType<T>> {
        return super.table(name, scope, TableMap[name])
    }
}
