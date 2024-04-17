import { Dispatch, ReactNode, SetStateAction } from "react"

type Props = {
  children: ReactNode
  modalTitle?: string
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
}

//===to be twweaked to serve purpose
const Dialog = ({ children, modalTitle, openModal, setOpenModal }: Props) => {
  const handleCloseDialog = () => {
    setOpenModal(false)
  }
  return (
    <>
      <div
        className={`fixed top-0 transition-all  ${
          openModal
            ? "left-0 top-0 opacity-100"
            : "-left-full -top-full opacity-5"
        } w-full h-full flex items-center justify-center z-50 bg-black/50`}
        aria-label="modal_wrapper"
      >
        <div
          className={`transition-all duration-75 ${
            openModal ? "w-max" : "w-0 h-0"
          }  min-h-max bg-white rounded-lg z-50 shadow-xl p-6`}
          aria-label="modal_content"
        >
          <div className="min-w-96 flex justify-between">
            <h2 className="font-mono text-lg font-medium">{modalTitle}</h2>
            <button className="" onClick={handleCloseDialog}>
              ❌
            </button>
          </div>
          {children}
        </div>
      </div>
    </>
  )
}

export default Dialog
