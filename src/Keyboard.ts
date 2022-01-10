export class Keyboard {
  public static state: Map<string, boolean>;

  public static initialize() {
    document.addEventListener('keydown', Keyboard.keyDown);
    document.addEventListener('keyup', Keyboard.keyUp);
    Keyboard.state = new Map();
  }

  private static keyDown(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, true);
  }

  private static keyUp(e: KeyboardEvent): void {
    Keyboard.state.set(e.code, false);
  }
}
