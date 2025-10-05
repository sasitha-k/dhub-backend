import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog'
import { capitalizeWords } from '@/constants/CapitalizedWord'



export default function DeleteConfirmationModal({ isOpen, setIsOpen, onClose, onConfirm, item, action}) {
    

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent>
                <AlertDialogHeader data-id="confirm-message">
                        <AlertDialogTitle>Are you absolutely sure ?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently <span className='text-blue-500 font-medium'>{action ? action : "delete"}</span> <span>{item ? <span className='text-blue-500 min-w-max font-medium'>{item}</span>:("your data")}</span>  from servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel className="bg-gray-500 text-white border-none hover:text-white px-4 py-2 rounded  hover:bg-gray-700" onClick={onClose} data-id="confirmation-model-cancel-button">Cancel</AlertDialogCancel>
                    <AlertDialogAction className="bg-red-500 text-white hover:text-white border-none px-4 py-2 rounded hover:bg-red-700" onClick={onConfirm} data-id="confirmation-model-Delete-button">{action ? capitalizeWords(action) : "Delete"}</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
  )
}
