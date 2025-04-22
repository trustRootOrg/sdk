"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.REGISTRY = void 0;
const eth_contract_1 = require("@ijstech/eth-contract");
const REGISTRY_json_1 = __importDefault(require("./REGISTRY.json"));
class REGISTRY extends eth_contract_1.Contract {
    constructor(wallet, address) {
        super(wallet, address, REGISTRY_json_1.default.abi, undefined);
        this.assign();
    }
    parseRegisteredEvent(receipt) {
        return this.parseEvents(receipt, "Registered").map(e => this.decodeRegisteredEvent(e));
    }
    decodeRegisteredEvent(event) {
        let result = event.data;
        return {
            uid: result.uid,
            registerer: result.registerer,
            _event: event
        };
    }
    assign() {
        let VERSION_call = async (options) => {
            let result = await this.call('VERSION', [], options);
            return result;
        };
        this.VERSION = VERSION_call;
        let getSchema_call = async (uid, options) => {
            let result = await this.call('getSchema', [this.wallet.utils.stringToBytes32(uid)], options);
            return ({
                uid: result.uid,
                resolver: result.resolver,
                revocable: result.revocable,
                schema: result.schema
            });
        };
        this.getSchema = getSchema_call;
        let registerParams = (params) => [params.schema, params.resolver, params.revocable];
        let register_send = async (params, options) => {
            let result = await this.send('register', registerParams(params), options);
            return result;
        };
        let register_call = async (params, options) => {
            let result = await this.call('register', registerParams(params), options);
            return result;
        };
        this.register = Object.assign(register_send, {
            call: register_call
        });
    }
}
REGISTRY._abi = REGISTRY_json_1.default.abi;
exports.REGISTRY = REGISTRY;
