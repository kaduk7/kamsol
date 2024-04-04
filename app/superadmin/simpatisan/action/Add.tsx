"use client"
import { useState, SyntheticEvent, useRef, useEffect } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import Swal from "sweetalert2";
import { useRouter } from "next/navigation"
import { supabase, supabaseBUCKET, tanggalHariIni } from '@/app/helper'

function Add({ reload }: { reload: Function }) {
    const [NIK, setNIK] = useState("")
    const [nama, setNama] = useState("")
    const [tempatLahir, setTempatlahir] = useState("")
    const [tanggalLahir, setTanggallahir] = useState(tanggalHariIni)
    const [alamat, setAlamat] = useState('')
    const [agama, setAgama] = useState('')
    const [jekel, setJekel] = useState("LAKI-LAKI")
    const [rincian, setRincian] = useState("Ya")
    const [golDarah, setGoldarah] = useState('')
    const [status, setStatus] = useState('')
    const [pekerjaan, setPekerjaan] = useState('')
    const [kewarganegaraan, setKewarganegaraan] = useState('')
    const [berlaku, setBerlaku] = useState('')
    const [file, setFile] = useState<File | null>()
    const [preview, setPreview] = useState('')
    const [show, setShow] = useState(false);
    const [st, setSt] = useState(false);
    const router = useRouter()
    const ref = useRef<HTMLInputElement>(null);
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

    const handleClose = () => {
        setShow(false);
        clearForm();
    }

    const handleShow = () => setShow(true);

    useEffect(() => {
        ref.current?.focus();
    }, [])

    useEffect(() => {
        if (!file) {
            setPreview('')
            return
        }
        const objectUrl = URL.createObjectURL(file)
        setPreview(objectUrl)

        return () => URL.revokeObjectURL(objectUrl)
    }, [file])

    function clearForm() {
        setNIK('')
        setNama('')
        setTempatlahir('')
        setTanggallahir(tanggalHariIni)
        setAlamat('')
        setAgama('')
        setJekel('LAKI-LAKI')
        setGoldarah('')
        setStatus('')
        setPekerjaan('')
        setKewarganegaraan('')
        setBerlaku('')
        setFile(null)
    }

    const handleSubmit = async (e: SyntheticEvent) => {
        setIsLoading(true)
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('NIK', NIK)
            formData.append('nama', nama)
            formData.append('tempatLahir', tempatLahir)
            formData.append('tanggalLahir', new Date(tanggalLahir).toISOString())
            formData.append('alamat', alamat)
            formData.append('agama', agama)
            formData.append('jekel', jekel)
            formData.append('golDarah', golDarah)
            formData.append('status', status)
            formData.append('pekerjaan', pekerjaan)
            formData.append('kewarganegaraan', kewarganegaraan)
            formData.append('berlaku', berlaku)
            formData.append('file', file as File)

            const image = formData.get('file') as File;
            const namaunik = Date.now() + '-' + image.name
            formData.append('namaunik', namaunik)

            const xxx = await axios.post(`/superadmin/api/simpatisan`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (xxx.data.pesan == 'NIK sudah ada') {
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'warning',
                    title: 'No NIK sudah terdaftar',
                    showConfirmButton: false,
                    timer: 1500
                })
            }

            if (xxx.data.pesan == 'berhasil') {
                const uploadResult = await supabase.storage
                    .from(supabaseBUCKET)
                    .upload(`foto-simpatisan/${namaunik}`, image)

                if (uploadResult.error) {
                    setIsLoading(false)
                    reload()
                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'Gagal Upload Gambar',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    throw uploadResult.error
                }
                handleClose();
                setIsLoading(false)
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Berhasil Simpan',
                    showConfirmButton: false,
                    timer: 1500
                })
                clearForm();
                reload()
                router.refresh()
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div>
            <button onClick={handleShow} type="button" className="btn btn-success btn-icon-text">
                Tambah</button>
            <Modal
                dialogClassName="modal-lg"
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}>
                <form onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Tambah Data Simpatisan</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="mb-3 row">
                            <div className="col-sm-8">
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >NIK</label>
                                    <div className="col-sm-9">
                                        <input
                                            autoFocus
                                            required
                                            type="text"
                                            className="form-control"
                                            value={NIK} onChange={(e) => setNIK(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Nama</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={nama} onChange={(e) => setNama(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Tempat Lahir</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="text"
                                            className="form-control"
                                            value={tempatLahir} onChange={(e) => setTempatlahir(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Tanggal Lahir</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="date"
                                            className="form-control"
                                            value={tanggalLahir} onChange={(e) => setTanggallahir(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label className="col-sm-3 col-form-label" >Upload Foto</label>
                                    <div className="col-sm-9">
                                        <input
                                            required
                                            type="file"
                                            className="form-control"
                                            onChange={(e) => setFile(e.target.files?.[0])}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                {file ?
                                    <div className="">
                                        <img
                                            src={preview}
                                            className="rounded"
                                            width={250}
                                            height={250}
                                            alt=""
                                        />
                                    </div>
                                    :
                                    <img className="bg-fotouser" />
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Alamat</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={alamat} onChange={(e) => setAlamat(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Agama</label>
                                <select
                                    required
                                    className="form-control"
                                    value={agama} onChange={(e) => setAgama(e.target.value)}>
                                    <option value={''}> Pilih Agama</option>
                                    <option value={'ISLAM'}>ISLAM</option>
                                    <option value={'KRISTEN'}>KRISTEN</option>
                                    <option value={'PROTESTAN'}>PROTESTAN</option>
                                    <option value={'HINDU'}>HINDU</option>
                                    <option value={'BUDHA'}>BUDHA</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Jenis Kelamin</label>
                                <div className="row">
                                    <div className="mb-3 col-md-6">
                                        <div className="form-check ">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="customRadioBox1"
                                                name="optradioCustom"
                                                value={jekel}
                                                checked={jekel === 'LAKI-LAKI'}
                                                onChange={() => setJekel('LAKI-LAKI')}
                                            />
                                            <label className="form-check-label" htmlFor="customRadioBox1">
                                                LAKI-LAKI
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mb-3 col-md-6">
                                        <div className="form-check ">
                                            <input
                                                type="radio"
                                                className="form-check-input"
                                                id="customRadioBox2"
                                                name="optradioCustom"
                                                value={jekel}
                                                checked={jekel === 'PEREMPUAN'}
                                                onChange={() => setJekel('PEREMPUAN')}

                                            />
                                            <label className="form-check-label" htmlFor="customRadioBox2">
                                                PEREMPUAN
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Gol Darah</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={golDarah} onChange={(e) => setGoldarah(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Status Perkawinan</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={status} onChange={(e) => setStatus(e.target.value)}
                                />
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Pekerjaan</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={pekerjaan} onChange={(e) => setPekerjaan(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Kewarganegaraan</label>
                                <select
                                    required
                                    className="form-control"
                                    value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)}>
                                    <option value={''}> Pilih</option>
                                    <option value={'WNI'}>WNI</option>
                                    <option value={'WNA'}>WNA</option>
                                </select>
                            </div>
                            <div className="mb-3 col-md-6">
                                <label className="form-label" >Berlaku Sampai</label>
                                <input
                                    required
                                    type="text"
                                    className="form-control"
                                    value={berlaku} onChange={(e) => setBerlaku(e.target.value)}
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

export default Add