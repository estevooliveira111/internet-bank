import { ExclamationTriangleIcon } from '@heroicons/react/20/solid'

import { Modal } from '@components/modal'
import { Loading } from '@components/loading'

import { cn } from '@utils/cn'

interface Props {
  loading: boolean
  handleDelete: () => void
  openConfirmDelete: boolean
  setOpenConfirmDelete: (value: boolean) => void
}

export function RemovePixKey({
  loading,
  handleDelete,
  openConfirmDelete,
  setOpenConfirmDelete,
}: Props) {
  return (
    <Modal open={openConfirmDelete} setOpen={setOpenConfirmDelete}>
      <>
        <div className="disabled:cursor-not-allowed sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Deletar chave Pix
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Tem certeza que deseja deletar essa chave? Essa ação não pode
                ser desfeita.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            disabled={loading}
            className={cn(
              'inline-flex w-full justify-center rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 disabled:pointer-events-none disabled:cursor-not-allowed sm:ml-3 sm:w-auto',
              loading && ' pointer-events-none cursor-not-allowed bg-gray-600',
            )}
            onClick={handleDelete}
          >
            {<Loading isLoading={loading} />}
            Sim, deletar
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => setOpenConfirmDelete(false)}
          >
            Cancelar
          </button>
        </div>
      </>
    </Modal>
  )
}
