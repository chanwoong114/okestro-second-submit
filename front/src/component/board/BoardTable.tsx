import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import './BoardTable.css'

interface ColTableProps {
  col: number[];
  headerContent: string[];
  bodyContent: (string[] | number[] | Date[] | { [key: string]: string | number | Date })[];
  onGoDetail: (id: string) => void;
}

/**
 * ColTable 컴포넌트
 * @param {[]} col - ColTable 열 너비 지정
 * @param {[]} headerContent - ColTable header 지정
 * @param {[]} bodyContent - ColTable body 지정
 * @param {[]} onGoDetail - 리스트 항목 클릭시 동작할 함수 지정
 */

function ColTable({ col, headerContent, bodyContent, onGoDetail }: ColTableProps) {
  const navigate = useNavigate();

  const [headers, setHeaders] = useState<Array<{ text: string; value: string }>>([]);
  const [bodys, setBodys] = useState<
    null | (string[] | number[] | Date[] | { [key: string]: string | number | Date })[]
  >(null);

  useEffect(() => {
    // headerContent 값 받아오기
    if (Array.isArray(headerContent)) {
      const newHeaders = headerContent.map((content) => ({ text: content, value: content }));
      setHeaders(newHeaders);
    } else {
      const newHeaders = Object.keys(headerContent).map((key) => ({ text: headerContent[key], value: key }));
      setHeaders(newHeaders);
    }

    // bodyContent 값 받아오기
    if (bodyContent && bodyContent.length) {
      const newBodys = bodyContent;
      setBodys(newBodys);
    }
  }, [headerContent, bodyContent]);

  return (
    <table className={`table1`}>
      <colgroup>
        <col style={{ width: `${col[0]}%`, borderRight: '1px solid #dddddd' }} />
        <col style={{ width: `${col[1]}%`, borderRight: '1px solid #dddddd' }} />
        <col style={{ width: `${col[2]}%`, borderRight: '1px solid #dddddd' }} />
        <col style={{ width: `${col[3]}%`, borderRight: '1px solid #dddddd' }} />
        {col.length > 5 ? (
          <col style={{ width: `${col[4]}%`, borderRight: '1px solid #dddddd' }} />
        ) : (
          <col style={{ width: `${col[4]}%` }} />
        )}
        {col.length > 5 && <col style={{ width: `${col[5]}%` }} />}
      </colgroup>

      <thead className={`header1`}>
        <tr>{headers && headers.map((header) => <th className={'header2'} style={{color: '#FFFFFF', backgroundColor: '#000080'}} key={header.text}>{header.text}</th>)}</tr>
      </thead>
      <tbody style={{backgroundColor: '#FFFFFF'}}>
      {bodys && bodys.length !== 0 ? (
        bodys.map((body) => (
          <tr
            key={JSON.stringify(body)}
            className={'body1'}
            onClick={() => {
              const id = (body as Record<string, string>).ID;
              if (/^\d+$/.test(id)) {
                // 정규표현식을 사용하여 숫자로 이루어져 있는지 확인
                onGoDetail(id);
              }
            }}
          >
            {headers &&
              headers.map((header) => {
                const cellContent = (body as Record<string, string>)[header.value];
                return (
                  <td key={header.text}>
                    {cellContent}
                  </td>
                );
              })}
          </tr>
        ))
      ) : null}
      </tbody>
    </table>
  );
}

export default ColTable;