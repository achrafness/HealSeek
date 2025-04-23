"use client";

import * as React from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import PrescriptionForm from "./Prescription";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { AxiosInstance } from "axios";
import AddModal from "./AddModal";

export type Appointment = {
    appointment_id: number;
    patient: {
        name: string;
        email: string;
        phone: string;
        date_of_birth: string;
        gender: string;
    };
    location: string;
    appointment_time: string;
    status: string;
    patient_id: number;
    doctor_id: number;
};

type AppointmentTableProps = {
    appointments: Appointment[];
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
};
import { useAuthStore } from "@/store/store";

export function AppointmentTable({ appointments, setAppointments }: AppointmentTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [open , setOpen] = React.useState(false)
    const axiosPrivate = useAxiosPrivate();
    const {user}= useAuthStore()

    const columns: ColumnDef<Appointment>[] = React.useMemo(
        () => [
            {
                accessorKey: "patient",
                header: "Patient",
                cell: ({ row }) => (
                    <div>{`${row.original.patient?.name || "John Doe"}`}</div>
                ),
            },
            {
                accessorKey: "patient phone",
                header: "Patient Phone",
                cell: ({ row }) => (
                    <div>{`${row.original.patient?.phone || "No phone number"}`}</div>
                ),
            },
            {
                accessorKey: "gender",
                header: "Gender",
                cell: ({ row }) => (
                    <div>{`${row.original.patient?.gender || "Not specified"}`}</div>
                ),
            },
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => (
                    <div>{`${row.original.appointment_time?.replace("T", " ").slice(0, 16) || "Not specified"}`}</div>
                ),
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => (
                    <div>{`${row.original.status === "cancelled" ?
                        "rejected" : row.original.status === "completed" ? "accepted"
                            : row.original.status

                        }`}</div>
                ),
            },
            {
                id: "actions",
                enableHiding: false,
                cell: ({ row }) => {
                    const appointment = row.original;

                    const handleAccept = async () => {
                        const response = await axiosPrivate.put(`/appointments/${appointment.appointment_id}`, { status: "completed" });

                        // Remove the rejected appointment from the list
                        setAppointments((prevAppointments) =>
                            prevAppointments.map((prevAppointment) =>
                                prevAppointment.appointment_id === appointment.appointment_id
                                    ? { ...prevAppointment, status: "completed" }
                                    : prevAppointment
                            )
                        );
                    };

                    const handleReject = async () => {
                        try {
                            console.log(`Rejecting appointment ID: ${appointment.appointment_id}`);
                            const response = await axiosPrivate.put(`/appointments/${appointment.appointment_id}`, { status: "cancelled" });
                            console.log(response);

                            // Remove the rejected appointment from the list
                            setAppointments((prevAppointments) =>
                                prevAppointments.map((prevAppointment) =>
                                    prevAppointment.appointment_id === appointment.appointment_id
                                        ? { ...prevAppointment, status: "cancelled" }
                                        : prevAppointment
                                )
                            );

                            console.log(`Rejected appointment ID: ${appointment.appointment_id}`);
                        } catch (error) {
                            console.error("Failed to reject appointment:", error);
                        }
                    };

                    return (
                        <div className="flex space-x-2">
                            {appointment.status == "scheduled" &&

                                <Button variant="default" onClick={handleAccept}>
                                    Accept
                                </Button>
                                /*   : appointment.status=="completed" ? <p className="text-green-500">Accepted</p>  
                                  : null  */
                            }
                            {appointment.status == "scheduled" && <Button variant="destructive" className="text-red-500" onClick={handleReject}>
                                Reject
                            </Button>
                                /* : appointment.status=="cancelled" ?  <p className="text-red-500">Rejected</p>
                                : null */
                            }
                            {
                                appointment.status=="completed" && <button className="text-green-500" onClick={()=>{setOpen(true)
                                    console.log(open)
                                }}>add prescription</button>
                
                            }
                            <AddModal open={open} onClose={() => setOpen(false)}>
                                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                    <PrescriptionForm setOpen={setOpen} appointmentId={appointment.appointment_id} patientId={row.original.patient_id} />
                                </div>
                            </AddModal>
                        </div>
                    );
                },
            },
        ],
        [axiosPrivate, setAppointments , open]
    );

    const table = useReactTable({
        data: appointments,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter by patient name..."
                    value={(table.getColumn("patient")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("patient")?.setFilterValue(event.target.value)
                    }
                    className="h-[67px] max-w-[787px] rounded-[25.14px] border border-[#D5D9DD] px-4 mx-4"
                />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className="text-[#666E7D] font-light text-[25px] h-[86px]">
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className="hover:bg-gray-100 text-[#252C58] font-light text-[25px] h-28"
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <TableCell key={cell.id}>
                                                {cell.column.id === "status" ? (
                                                    <span
                                                        className={
                                                            row.original.status === "Confirmed"
                                                                ? "bg-[#EFEFEF] text-[#8A8A8A] px-4 py-2 rounded-[25.14px]"
                                                                : row.original.status === "Pending"
                                                                    ? "bg-[#E6EFFC] text-[#0764E6] px-4 py-2 rounded-[25.14px]"
                                                                    : row.original.status === "Cancelled"
                                                                        ? "bg-[#FFE5EE] text-[#AA0000] px-4 py-2 rounded-[25.14px]"
                                                                        : ""
                                                        }
                                                    >
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </span>
                                                ) : (
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )
                                                )}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}