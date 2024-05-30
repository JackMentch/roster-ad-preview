import React, { useState, useRef } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd"
import "./Draggable.css"
import { ListItem } from "./ListItem";


interface Props {
    ordering: string[]
    setOrdering(ordering: string[]): void;
}



export const DraggableObject: React.FC<Props> = ({ordering, setOrdering}) => {


    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result
        if (!destination) return
    
        const items = Array.from(ordering)
        const [newOrder] = items.splice(source.index, 1)
        items.splice(destination.index, 0, newOrder)
    
        setOrdering(items)
      }


    return (

        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="todo">
                {(provided) => (


                    <div {...provided.droppableProps} ref={provided.innerRef}>

                        {ordering.map((player, index) => {
                            return (
                                <Draggable key={player} draggableId={player} index={index}>

                                    {(provided, snapshot) => (
                                        <div className="select-container"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}

                                            style={{
                                                background: snapshot.isDragging ? "#596475" : "#2563eb",
                                                ...provided.draggableProps.style
                                            }}
                                        >
                                            <div>
                                                <ListItem player={player} index={index + 1} />
                                            </div>
                                        </div>

                                    )}

                                </Draggable>
                            )
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>

    );
};


export default Draggable;