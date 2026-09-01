import { getAllMessages } from "@/lib/queries";
import MessagesList from "@/components/admin/MessagesList";

export const dynamic = "force-dynamic";

export default async function MessagesAdminPage() {
  const messages = await getAllMessages();
  const unread = messages.filter((m) => !m.read).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-sans text-2xl font-extrabold text-ink-900">Mensajes</h1>
        <p className="mt-1 font-serif text-ink-800">
          {messages.length} mensaje{messages.length === 1 ? "" : "s"} · {unread} sin leer
        </p>
      </div>
      <MessagesList messages={messages} />
    </div>
  );
}
