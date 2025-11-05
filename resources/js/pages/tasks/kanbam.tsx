import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState, useEffect } from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { dashboard } from "@/routes";
import * as taskrouter from "@/routes/tasks";
import { PlusCircle } from "lucide-react";
import { type BreadcrumbItem, type PageProps, type Task } from "@/types";

interface IndexTasksProps extends PageProps {
  tasks: Task[];
}

type ColumnKey = "pending" | "in_progress" | "completed";
type Columns = Record<ColumnKey, Task[]>;

export default function KanbanBoard({ tasks }: IndexTasksProps) {
  const { flash }: any = usePage().props;
  const [showSuccess, setShowSuccess] = useState(false);

  const [columns, setColumns] = useState<Columns>({
    pending: tasks.filter((t) => t.status === "pending"),
    in_progress: tasks.filter((t) => t.status === "in_progress"),
    completed: tasks.filter((t) => t.status === "completed"),
  });

  useEffect(() => {
    setColumns({
      pending: tasks.filter((t) => t.status === "pending"),
      in_progress: tasks.filter((t) => t.status === "in_progress"),
      completed: tasks.filter((t) => t.status === "completed"),
    });
  }, [tasks]);

  useEffect(() => {
    if (flash?.success) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [flash?.success]);

  function onDragEnd(result: any) {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceCol = source.droppableId as ColumnKey;
    const destCol = destination.droppableId as ColumnKey;

    const sourceTasks = Array.from(columns[sourceCol]);
    const [moved] = sourceTasks.splice(source.index, 1);

    moved.status = destCol;

    if (sourceCol === destCol) {
      sourceTasks.splice(destination.index, 0, moved);
      setColumns({ ...columns, [sourceCol]: sourceTasks });
    } else {
      const destTasks = Array.from(columns[destCol]);
      destTasks.splice(destination.index, 0, moved);

      setColumns({
        ...columns,
        [sourceCol]: sourceTasks,
        [destCol]: destTasks,
      });

      router.patch(
        taskrouter.status(moved.id).url,
        { status: destCol },
        {
          preserveState: true,
          preserveScroll: true,
          onSuccess: () => {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 4000);
          },
        }
      );
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { title: "Dashboard", href: dashboard().url },
    { title: "Tarefas", href: taskrouter.index().url },
  ];

  const columnTitles: Record<ColumnKey, string> = {
    pending: "Pendente",
    in_progress: "Em Progresso",
    completed: "Concluída",
  };

  const columnColors: Record<ColumnKey, string> = {
    pending: "border-l-4 border-l-yellow-500",
    in_progress: "border-l-4 border-l-blue-500",
    completed: "border-l-4 border-l-green-500",
  };

  // 🔤 Tradução + cor do status
  const getStatusBadge = (status: string) => {
    const label =
      status === "pending"
        ? "Pendente"
        : status === "in_progress"
        ? "Em Progresso"
        : "Concluída";

    const color =
      status === "pending"
        ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
        : status === "in_progress"
        ? "bg-blue-100 text-blue-700 border border-blue-300"
        : "bg-green-100 text-green-700 border border-green-300";

    return (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium ${color}`}
      >
        {label}
      </span>
    );
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Quadro Kanban" />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Kanban de Tarefas</h1>
          <Link
            href={taskrouter.create().url}
            className="flex items-center gap-2 bg-[#FF750F] text-white px-4 py-2 rounded-lg font-semibold shadow hover:scale-105 transition"
          >
            <PlusCircle className="h-4 w-4" /> Nova Tarefa
          </Link>
        </div>

        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 px-5 py-4 text-white shadow-2xl backdrop-blur-sm transition-all duration-500 ease-out ${
            showSuccess
              ? "translate-x-0 opacity-100 scale-100"
              : "translate-x-[120%] opacity-0 scale-95"
          }`}
        >
          Tarefa Atualizada com Sucesso
        </div>

        <DragDropContext onDragEnd={onDragEnd}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(Object.entries(columns) as [ColumnKey, Task[]][]).map(
              ([key, columnTasks]) => (
                <Droppable droppableId={key} key={key}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`rounded-xl bg-white dark:bg-[#1C1C1A] p-4 border border-gray-200 dark:border-[#3E3E3A] shadow ${columnColors[key]} ${
                        snapshot.isDraggingOver
                          ? "bg-gray-50 dark:bg-[#252523]"
                          : ""
                      }`}
                    >
                      <h2 className="text-xl font-semibold mb-3">
                        {columnTitles[key]} ({columnTasks.length})
                      </h2>

                      <div className="space-y-2 min-h-[200px]">
                        {columnTasks.length === 0 ? (
                          <p className="text-gray-400 text-sm text-center py-8">
                            Nenhuma tarefa nesta coluna
                          </p>
                        ) : (
                          columnTasks.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={String(task.id)}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`p-3 rounded-lg bg-gray-50 dark:bg-[#2a2a28] hover:bg-gray-100 dark:hover:bg-[#333] transition-all ${
                                    snapshot.isDragging
                                      ? "shadow-lg ring-2 ring-[#FF750F] rotate-2"
                                      : ""
                                  }`}
                                >
                                  <div className="flex justify-between items-center">
                                    <Link
                                      href={taskrouter.show(task.id).url}
                                      className="block font-medium hover:text-[#FF750F] transition"
                                    >
                                      {task.title}
                                    </Link>
                                    {getStatusBadge(task.status)}
                                  </div>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {new Date(
                                      task.created_at
                                    ).toLocaleDateString("pt-BR")}
                                  </p>
                                </div>
                              )}
                            </Draggable>
                          ))
                        )}
                      </div>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              )
            )}
          </div>
        </DragDropContext>
      </div>
    </AppLayout>
  );
}
