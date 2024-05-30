import React from "react";


interface Props {
  player:string;
  index: number;
}

export const ListItem: React.FC<Props> = ({ player, index}) => {
  return (
    <article className="flex items-start space-x-2 p-1 ">
      <div>
        <dd className="px-1 ring-1 ring-slate-200 rounded">{index}</dd>
      </div>
      <div className="min-w-0 relative flex-auto">
        <h2 className="px-1 font-semibold text-slate-900 truncate text-gray-100">{player}</h2>
      </div>
    </article>
  )
}