import { Box } from '@mui/system';
import { getDocumentInformation } from '../api/api';
import { Block } from '../types/Block';
import { getLabelClass } from '../utils/helper';

type Props = {
  response: Block[];
};
export function DocumentPreview({ response }: Props) {
  response = response || getDocumentInformation(new FormData());
  return (
    <Box>
      {response.map((block, index) => {
        return (
          <p key={index}>
            {block.value.map((span, id) => (
              <span
                key={id}
                dangerouslySetInnerHTML={{
                  __html: span.text.split('\n').join('<br/>'),
                }}
                title={span.category}
                className={getLabelClass(span.category)}
              ></span>
            ))}
          </p>
        );
      })}
    </Box>
  );
}
