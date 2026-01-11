"use client";

import * as React from "react";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { restrictToParentElement, restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Column, Table } from "@tanstack/react-table";
import { ChevronDown, Eye, EyeOff, GripVertical, Search } from "lucide-react";

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props<TData> = {
  table: Table<TData>;
};

export default function ColumnCustomizer<TData>({ table }: Props<TData>) {
  const [query, setQuery] = React.useState("");

  const columns = table.getAllLeafColumns();

  const [order, setOrder] = React.useState<string[]>(columns.map((c) => c.id));

  // keep local state in sync with table
  React.useEffect(() => {
    const next = table.getState().columnOrder;
    if (next.length) setOrder(next);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table.getState().columnOrder]);

  const sensors = useSensors(useSensor(PointerSensor));

  const filtered = columns.filter((c) => c.id.toLowerCase().includes(query.toLowerCase()));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="text-foreground">
        <Button variant="ghost" size="sm" className="font-normal">
          Customize
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="center" className="bg-popover w-64 p-2">
        <InputGroup className="bg-card! mb-2">
          <InputGroupInput
            placeholder="Search columns..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          autoScroll={false}
          modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          onDragOver={({ active, over }) => {
            if (!over || active.id === over.id) return;

            setOrder((prev) => {
              const oldIndex = prev.indexOf(active.id as string);
              const newIndex = prev.indexOf(over.id as string);
              if (oldIndex === newIndex) return prev;

              const next = arrayMove(prev, oldIndex, newIndex);
              table.setColumnOrder(next);
              return next;
            });
          }}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            <div className="space-y-1">
              {filtered.map((column) => (
                <SortableRow key={column.id} column={column} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function SortableRow<TData>({ column }: { column: Column<TData, unknown> }) {
  "use no memo";

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: column.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const label = typeof column.columnDef.header === "string" ? column.columnDef.header : column.id;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "hover:bg-accent/70 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 select-none",
        !column.getCanHide() && "cursor-not-allowed"
      )}
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === "BUTTON") return;
        if (column.getCanHide()) column.toggleVisibility();
      }}
    >
      <button {...attributes} {...listeners} className="text-muted-foreground cursor-grab">
        <GripVertical size={16} />
      </button>

      <span className="flex-1 truncate text-sm capitalize">{label}</span>

      <button
        disabled={!column.getCanHide()}
        className={cn(
          "text-muted-foreground",
          !column.getCanHide() ? "cursor-not-allowed opacity-40" : "hover:text-foreground"
        )}
      >
        {column.getIsVisible() ? <Eye size={16} /> : <EyeOff size={16} />}
      </button>
    </div>
  );
}
