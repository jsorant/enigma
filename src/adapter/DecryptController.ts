import {
  Decrypt,
  DecryptInput,
  DecryptResult,
} from "../domain/usecase/Decrypt";
import { Controller } from "./Controller";

export class DecryptController extends Controller<DecryptInput, DecryptResult> {
  constructor(decrypt: Decrypt) {
    super(decrypt);
  }

  protected adaptInput(body: any): DecryptInput {
    return {
      modelName: body.security_model_name,
      encryptedMessage: body.encrypted_message,
    };
  }

  protected adaptJsonResponseBody(usecaseResult: DecryptResult): any {
    return {
      decrypted_message: usecaseResult.decryptedMessage,
    };
  }
}
