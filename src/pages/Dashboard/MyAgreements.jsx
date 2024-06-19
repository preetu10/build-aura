
const MyAgreements = () => {
    return (
        <div>
             <h1 className="mt-5 text-center p-5 text-black font-bold text-2xl">
        My Agreements
      </h1>
      <div className="overflow-x-auto p-2 ">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Floor</th>
              <th>Block</th>
              <th>Apartment No</th>
              <th>Agreement Accept Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>None</td>
              <td>None</td>
              <td>None</td>
              <td>None</td>
              <td>None</td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
    );
};

export default MyAgreements;