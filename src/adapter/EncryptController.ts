import {
  Encrypt,
  EncryptInput,
  EncryptResult,
} from "../domain/usecase/Encrypt";
import { Controller } from "./Controller";

export class EncryptController extends Controller<EncryptInput, EncryptResult> {
  private constructor(encrypt: Encrypt) {
    super(encrypt);
  }

  static buildWithUseCase(encrypt: Encrypt): EncryptController {
    return new EncryptController(encrypt);
  }

  protected adaptInput(body: any): EncryptInput {
    return {
      securityModelName: body.security_model_name,
      messageToEncrypt: body.message,
    };
  }

  protected adaptJsonResponseBody(usecaseResult: EncryptResult): any {
    return {
      encrypted_message: usecaseResult.encryptedMessage,
    };
  }
}
