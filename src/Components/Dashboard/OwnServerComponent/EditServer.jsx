import edit from "../../../assets/edit.svg";

export default function EditServer() {
  return (
    <section
      title="edit server"
      className="flex justify-center items-center h-[30px] w-[30px] border-[#0A879E] box-border rounded cursor-pointer bg-[#E5E7EB] hover:bg-[white]"
    >
      <img src={edit} alt="edit server" className="h-[15px]" />
    </section>
  );
}
