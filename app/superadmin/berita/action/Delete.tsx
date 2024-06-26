"use client"
import { useState } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { supabase, supabaseBUCKET } from "@/app/helper";

function Delete({ beritaId, reload, beritafoto }: { beritaId: Number, reload: Function, beritafoto: String }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isLoading, setIsLoading] = useState(false)
    if (isLoading) {
        Swal.fire({
            title: "Mohon tunggu!",
            html: "Sedang mengirim data ke server",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            },
        })
    }

    const handleDelete = async (beritaId: number) => {
        setIsLoading(true)
        handleClose()
        const deleteResult = await supabase.storage
            .from(supabaseBUCKET)
            .remove([`foto-berita/${beritafoto}`]);
        if (deleteResult.error) {
            setIsLoading(false)
            reload()
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'Gagal Delete Gambar',
                showConfirmButton: false,
                timer: 1500
            })
            throw deleteResult.error
        }
        await axios.delete(`/superadmin/api/berita/${beritaId}`)
        reload()
        setIsLoading(false)
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Berhasil dihapus',
            showConfirmButton: false,
            timer: 1500
        })
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-danger shadow btn-xs sharp mx-1"><i className="fa fa-trash"></i></span>
            <Modal
                dialogClassName="modal-md"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Body>
                    <h6 className="font-bold" style={{ color: "black" }}>Anda yakin menghapus data ini ?</h6>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-warning light" onClick={handleClose}>Close</button>
                    <button type="button" className="btn btn-danger light" onClick={() => handleDelete(Number(beritaId))}>Ya, Hapus</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Delete