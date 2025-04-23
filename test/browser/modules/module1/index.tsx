
import { Module, Styles, Container, customModule, application, Input } from '@ijstech/components';
import { SDK } from '@trustroot/sdk';
import { Wallet, IClientWallet } from '@ijstech/eth-wallet';
@customModule
export default class Module1 extends Module {
    private wallet: IClientWallet;
    private sdk: SDK;
    private edtSchemaUID: Input;
    private edtSchema: Input;
    private edtAttestationUID: Input;
    private edtAttestation: Input;
    async init() {
        super.init();
        const wallet = Wallet.getClientInstance();
        this.wallet = wallet;       
        await this.wallet.init();
        this.sdk = new SDK(this.wallet);
    }
    async getSchema() {        
        let connected = this.wallet.isConnected;
        console.log('Wallet connected:', connected);
        let schema = await this.sdk.getSchema(this.edtSchemaUID.value);
        this.edtSchema.value = schema.schema;
        console.log('Schema:', schema);
    };
    async getAttestation(){
        let attestation = await this.sdk.getAttestation(this.edtAttestationUID.value);
        this.edtAttestation.value = JSON.stringify(attestation.data);
    }
    render() {
        return <i-panel>
            <i-hstack padding={{top: 10}} gap={10}>
                <i-label caption='Schema UID' width={100} height={30}></i-label>
                <i-input id='edtSchemaUID' width={300} height={30} placeholder='Schema UID' value='0x8493d7029d29c9637f9dbac5de6d4bb2f20853bc4153c5b4e083e35deefb2c6b'></i-input>
                <i-button height={30} width={150} caption='Get Schema' onClick={this.getSchema}></i-button>
            </i-hstack>
            <i-hstack padding={{top: 10}} gap={10}>
                <i-label caption='Schema' width={100} height={30}></i-label>
                <i-input id='edtSchema' width={300} height={30} readOnly></i-input>
            </i-hstack>

            <i-hstack padding={{top: 10}} gap={10}>
                <i-label caption='Attestation UID' width={100} height={30}></i-label>
                <i-input id='edtAttestationUID' width={300} height={30} placeholder='A UID' value='0x0804e4796c721b81c9b700f521b3a9c9d589c0ec2758d556919487e64f407751'></i-input>
                <i-button height={30} width={150} caption='Get Attestation' onClick={this.getAttestation}></i-button>
            </i-hstack>
            <i-hstack padding={{top: 10}} gap={10}>
                <i-label caption='Attestation' width={100} height={30}></i-label>
                <i-input id='edtAttestation' width={300} height={30} readOnly></i-input>
            </i-hstack>

        </i-panel>
    }
}