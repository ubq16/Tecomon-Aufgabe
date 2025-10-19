'use client';

import { Dialog } from '@headlessui/react';

interface DeleteWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  widgetName: string;
}

export default function DeleteWidget({
  isOpen,
  onClose,
  onDelete,
  widgetName,
}: DeleteWidgetProps) {
  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">

        <div className="fixed inset-0 bg-gray-900 bg-opacity-20 backdrop-blur-sm" aria-hidden="true" />

        <Dialog.Panel className="bg-white rounded-2xl max-w-sm w-full mx-auto p-6 z-50 shadow-2xl relative border border-gray-100">
          <Dialog.Title className="text-xl font-bold text-gray-900">Delete Widget</Dialog.Title>
          <Dialog.Description className="mt-2 text-gray-700">
            Are you sure you want to delete <span className="font-semibold text-red-600">{widgetName}</span>'s widget?
          </Dialog.Description>

          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
