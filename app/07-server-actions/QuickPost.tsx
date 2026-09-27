import { quickPost } from "./actions";

export default function QuickPost() {
  return (
    <form action={quickPost} className="form">
      <input name="text" placeholder="Say hi as Guest" aria-label="Message" />
      <button>Post</button>
    </form>
  );
}
