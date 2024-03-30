"use client"
import { useState, SyntheticEvent, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2"
import { AdminTb } from "@prisma/client";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET } from '@/app/helper'

function Update({ admin, reload }: { admin: AdminTb, reload: Function }) {

    const [nama, setNama] = useState(admin.nama)
    const [hp, setHp] = useState(admin.hp)
    const [wa, setWa] = useState(admin.wa)
    const [password, setPassword] = useState("")
    const [file, setFile] = useState<File | null>()
    const [foto, setFoto] = useState(admin.foto)
    const [show, setShow] = useState(false);
    const [st, setSt] = useState(false);
    const router = useRouter()
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

    useEffect(() => {
        if (!file) {
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setFoto(objectUrl)
        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    const handleClose = () => {
        setShow(false);
        refreshform()
    }

    const hapuspass = () => {
        setPassword('')
    }

    const handleShow = () => setShow(true);

    const refreshform = () => {
        setNama(admin.nama)
        setHp(admin.hp)
        setWa(admin.wa)
        setPassword("")
        setFoto(admin.foto)
    }

    const handleUpdate = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        const newpass = password == "" ? 'no' : 'yes'
        const newfoto = foto === admin.foto ? 'no' : 'yes'
        try {
            const formData = new FormData()
            formData.append('nama', nama)
            formData.append('hp', hp)
            formData.append('wa', wa)
            formData.append('password', password)
            formData.append('file', file as File)
            formData.append('newpass', newpass)
            formData.append('newfoto', newfoto)
            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            const xxx = await axios.patch(`/api/superadmin/${admin.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            if (xxx.data.pesan == 'sudah ada hp') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'No hp ini sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (xxx.data.pesan == 'sudah ada wa') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'No WA ini sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            if (xxx.data.pesan == 'berhasil') {
                if (newfoto === 'yes') {
                    await supabase.storage
                        .from(supabaseBUCKET)
                        .remove([`foto-admin/${admin.foto}`]);

                    await supabase.storage
                        .from(supabaseBUCKET)
                        .upload(`foto-admin/${namaunik}`, image);
                    setFoto(namaunik)
                }
                setShow(false);
                setIsLoading(false)
                hapuspass()
                reload()
                router.refresh()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil diubah',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <span onClick={handleShow} className="btn btn-success shadow btn-xs sharp mx-1"><i className="fa fa-edit"></i></span>
            <Modal
                dialogClassName="modal-m"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Data User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Nama</label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    className="form-control"
                                    value={nama} onChange={(e) => setNama(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >No Hp</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={hp} onChange={(e) => setHp(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >No WA</label>
                                <input
                                    required
                                    type="number"
                                    className="form-control"
                                    value={wa} onChange={(e) => setWa(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Password</label>
                                <div className="input-group input-success">
                                    <input
                                        type={st ? "text" : "password"}
                                        className="form-control"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {st ?
                                        <button onClick={() => setSt(!st)} className="input-group-text border-0" type="button">
                                            <i className="mdi mdi-eye-off" />
                                        </button>
                                        :
                                        <button onClick={() => setSt(!st)} className="input-group-text border-0" type="button">
                                            <i className="mdi mdi-eye" />
                                        </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-12">
                                <label className="form-label" >Foto</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/png, image/jpeg"
                                    onChange={(e) => setFile(e.target.files?.[0])}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-danger light" onClick={handleClose}>Close</button>
                        <button type="submit" className="btn btn-primary light">Simpan</button>
                    </Modal.Footer>
                </form>
            </Modal>
        </div>
    )
}

export default Update