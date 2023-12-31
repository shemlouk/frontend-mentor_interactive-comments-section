import { editContent } from "@/app/lib/actions";
import { FormButton } from "../buttons";

export default function EditContentForm({
  id,
  content,
  closeForm,
}: {
  id: number;
  content: string;
  closeForm(newContent: string): void;
}) {
  const updateContentWithId = editContent.bind(null, id);

  return (
    <form
      action={(formData) => {
        const content = (formData.get("content") ?? "").toString();
        updateContentWithId(content);
        closeForm(content);
      }}
      className="flex flex-col items-end gap-4"
    >
      <textarea
        id="content"
        name="content"
        defaultValue={content}
        className="h-32 md:px-6 md:py-4 focus:border-transparent focus:outline-1 focus:outline-offset-0 focus:outline-grayishBlue/20"
      />
      <FormButton value="update" />
    </form>
  );
}
