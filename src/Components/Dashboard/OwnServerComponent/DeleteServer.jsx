import trash from "../../../assets/trash.svg";

export default function DeleteServer() {
  return (
    <section
      title="delete server"
      className="flex justify-center items-center h-[30px] w-[30px] border border-[#0A879E] box-border rounded cursor-pointer bg-[#E5E7EB] hover:bg-[white]"
    >
      <img src={trash} alt="delete server" className="h-[15px]" />
    </section>
  );
}
