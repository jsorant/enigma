import {
  Encrypt,
  EncryptInput,
  EncryptResult,
} from "../domain/usecase/Encrypt";
import { Controller } from "./Controller";

export class EncryptController extends Controller<EncryptInput, EncryptResult> {
  constructor(encrypt: Encrypt) {
    super(encrypt);
  }

  protected adaptInput(body: any): EncryptInput {
    return {
      modelName: body.security_model_name,
      message: body.message,
    };
  }

  protected adaptJsonResponseBody(usecaseResult: EncryptResult): any {
    return {
      encrypted_message: usecaseResult.encryptedMessage,
    };
  }
}
