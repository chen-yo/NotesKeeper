interface Note {
    id: number
    title: string
    body: string
    priority: number
    read: boolean
    color: string
    icon: string
    // onClick: MouseEvent
    // onDelete: MouseEvent
    // noteIdToDelete: number
}

type RootState = {
    notes: {
        notes: Note[]
    }
}