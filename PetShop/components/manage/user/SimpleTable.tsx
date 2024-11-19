import { IUserModel } from "@MyTypes/User.Type";
import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";
export default function SimpleTable<T extends { key: string }>({
  Items,
  Headers,
  RenderRow,
  Filter,
}: {
  Items: T[];
  Headers: (keyof T & string)[];
  RenderRow: (item: T) => JSX.Element;
  Filter?: (item: T) => boolean;
}) {
  const [page, setPage] = useState<number>(0);
  const [numberOfItemsPerPageList] = useState([5, 10, 20]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, Items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);
  return (
    <DataTable>
      <DataTable.Header>
        {Headers.map((header) => (
          <DataTable.Title key={`${header}`}>{header}</DataTable.Title>
        ))}
      </DataTable.Header>

      {Items.filter(Filter ?? (() => true))
        .slice(from, to)
        .map((item, index) => RenderRow(item))}
      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(Items.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${Items.length}`}
        numberOfItemsPerPageList={numberOfItemsPerPageList}
        numberOfItemsPerPage={itemsPerPage}
        onItemsPerPageChange={onItemsPerPageChange}
        showFastPaginationControls
        selectPageDropdownLabel={"Rows per page"}
      />
    </DataTable>
  );
}
