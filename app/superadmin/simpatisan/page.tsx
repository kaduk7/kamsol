"use client"
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Add from './action/Add';
import Update from './action/Update';
import Delete from './action/Delete';
import { supabaseBUCKET, supabaseUrl, tanggalIndo } from "@/app/helper";

const Simpatisan = () => {
  const [datasimpatisan, setDatasimpatisan] = useState([])
  const [filterText, setFilterText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    reload()
  }, [])

  const reload = async () => {
    try {
      const response = await fetch(`/superadmin/api/simpatisan`);
      const result = await response.json();
      setDatasimpatisan(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = datasimpatisan.filter(
    (item: any) => item.nama && item.nama.toLowerCase().includes(filterText.toLowerCase()),
  );

  const columns = [
    {
      name: 'Foto',
      cell: (row: any) => (
        <div className="d-flex mb-3 mt-3">
          <img
            src={`${supabaseUrl}/storage/v1/object/public/${supabaseBUCKET}/foto-simpatisan/${row.foto}`}
            width={80}
            height={80}
            alt=""
          />
        </div>
      ),
      width: '200px'
    },
    {
      name: 'Nama',
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: 'Jenis Kelamin',
      selector: (row: any) => row.jekel,
      sortable: true,
    },
    {
      name: 'Alamat',
      selector: (row: any) => row.alamat,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row: any) => (
        <div className="d-flex">
          <Update reload={reload} simpatisan={row} />
          <Delete reload={reload} simpatisanId={row.id} simpatisanFoto={row.foto} />
        </div>
      ),
      width: '150px'
    },

  ];

  return (
    <div>
      <div className="row">
        <div className="col-md-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-header">
              <h1 className="card-title">Data Simpatisan</h1>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-9">
                  <Add reload={reload} />
                </div>
              </div>
              <DataTable
                columns={columns}
                data={filteredItems}
                pagination
                persistTableHead
                responsive
                paginationPerPage={itemsPerPage}
                paginationTotalRows={filteredItems.length}
                onChangePage={(page) => setCurrentPage(page)}
                onChangeRowsPerPage={handleRowsPerPageChange}
                paginationRowsPerPageOptions={[5, 10, 20]}
                customStyles={{
                  headRow: {
                    style: {
                      backgroundColor: '#53d0b2',
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div >
    </div >
  )
}

export default Simpatisan