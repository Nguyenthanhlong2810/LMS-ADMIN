import { IconButton, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ExpandableTable({ data = [], columns = [], rowKey, defaultExpanded = false }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {columns.map((c) => (
            <TableCell key={c.key} align={c.align} sx={{ fontWeight: 'bold', ...c.style }}>
              {c.name}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row, rowIndex) => {
          if (row.children?.length) {
            return (
              <ExpandableTableRow
                defaultExpanded={defaultExpanded}
                key={row[rowKey]}
                data={row}
                columns={columns}
                rowKey={rowKey}
                rowIndex={rowIndex}
                parent={row}
              />
            );
          }
          return (
            <TableRow key={row[rowKey]}>
              {columns.map((c, colIndex) => (
                <TableCell key={`${c.key ?? colIndex}_${row[rowKey]}`}>
                  {c.render ? c.render(row) : row[c.key]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

const ExpandableTableRow = ({ data, columns, rowKey, level = 0, defaultExpanded, parent }) => {
  const isExpandable = Boolean(data.children?.length);
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <>
      <TableRow>
        {columns.map((c, colIndex) => (
          <TableCell
            key={`${c.key ?? colIndex}_${data[rowKey]}`}
            sx={{
              paddingLeft: colIndex === 0 ? `${isExpandable ? level : level * 2}rem` : '1rem'
            }}>
            {isExpandable && colIndex === 0 && (
              <IconButton onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
            {c.render ? c.render(data, parent) : data[c.key]}
          </TableCell>
        ))}
      </TableRow>
      {isExpanded &&
        data.children &&
        data.children.map((c, i) => (
          <ExpandableTableRow
            defaultExpanded={defaultExpanded}
            level={level + 1}
            key={`${c[rowKey]}_${i}`}
            rowKey={rowKey}
            data={c}
            columns={columns}
            parent={data}
          />
        ))}
    </>
  );
};

export default React.memo(ExpandableTable);
