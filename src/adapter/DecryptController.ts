import {
  Decrypt,
  DecryptInput,
  DecryptResult,
} from "../domain/usecase/Decrypt";
import { Controller } from "./Controller";

const ROUTE: string = "/decrypt";

export class DecryptController extends Controller<DecryptInput, DecryptResult> {
  private constructor(decrypt: Decrypt) {
    super(ROUTE, decrypt);
  }

  static buildWithUseCase(decrypt: Decrypt): DecryptController {
    return new DecryptController(decrypt);
  }

  protected adaptInput(body: any): DecryptInput {
    return {
      securityModelName: body.security_model_name,
      messageToDecrypt: body.encrypted_message,
    };
  }

  protected adaptJsonResponseBody(usecaseResult: DecryptResult): any {
    return {
      decrypted_message: usecaseResult.decryptedMessage,
    };
  }
}
