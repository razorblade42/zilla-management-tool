
// a little function to help us with reordering the result
export const reorder = (
    list,
    startIndex,
    endIndex

) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export const reorderRows = (
    rows,
    source,
    destination,

) => {
    const current = rows.find(x => x.id === source.droppableId);
    const next = rows.find(x => x.id === destination.droppableId);
    const target = current.values[source.index];

    // moving to same list
    if (source.droppableId === destination.droppableId) {
        const reordered = reorder(current.values, source.index, destination.index);
        return rows.map(x => (x.id === source.droppableId ? { ...x, values: reordered } : x));
    }

    // moving to different list

    // remove from original
    current.values.splice(source.index, 1);
    // insert into next
    next.values.splice(destination.index, 0, target);

    return rows.map(x => {
        if (x.id === source.droppableId) {
            return {
                ...x,
                values: current.values
            };
        } else if (x.id === destination.droppableId) {
            return {
                ...x,
                values: next.values
            };
        }

        return x;
    });
};