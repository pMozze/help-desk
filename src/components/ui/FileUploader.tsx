import { useEffect, useRef, useState, forwardRef, ComponentPropsWithoutRef, useImperativeHandle } from 'react';
import styled from 'styled-components';

import FileIcon from '@icons/file.svg?react';

interface Props {
  subtitle: string;
}

const Wrapper = styled.div`
  max-width: 775px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #868686;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: #868686;
`;

const Body = styled.div`
  margin-top: 15px;
  padding: 35px 30px;

  display: flex;
  flex-direction: column;
  row-gap: 30px;

  border-radius: 8px;
  border: 1px solid #dadada;
  background-color: #f8f9fa;

  input {
    display: none;
  }
`;

const DropZone = styled.label`
  padding: 15px;

  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #868686;

  border-radius: 12px;
  border: 1px dashed #cccccc;

  cursor: pointer;
  user-select: none;
`;

const FileList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-bottom: 30px;
  border-bottom: 1px solid #e3e3e3;
`;

const File = styled.div`
  padding: 15px 5px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  row-gap: 10px;

  width: 120px;
  height: 120px;

  font-size: 14px;
  font-weight: 500;

  text-align: center;
  word-break: break-word;

  color: #868686;
  background-color: #fff;

  border-radius: 12px;
`;

const FileUploader = forwardRef<HTMLInputElement, Props & ComponentPropsWithoutRef<'input'>>((props, ref) => {
  const { className, subtitle, ...rest } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<string[]>([]);

  useEffect(() => {
    const input = inputRef.current!;

    const onChangeHandler = () => {
      const filesNames = [];

      for (let index = 0; index < input.files!.length; index++) {
        filesNames.push(input.files!.item(index)!.name);
      }

      setFiles(filesNames);
    };

    input.addEventListener('change', onChangeHandler);
    return () => input.removeEventListener('change', onChangeHandler);
  }, []);

  useImperativeHandle(ref, () => inputRef.current!);

  return (
    <Wrapper className={className}>
      <Title>Attach screenshots or documents </Title>
      <Subtitle>{subtitle}</Subtitle>
      <Body>
        {!!files.length && (
          <FileList>
            {files.map((file, fileIndex) => (
              <File key={fileIndex}>
                <FileIcon />
                {file}
              </File>
            ))}
          </FileList>
        )}
        <DropZone>
          Drop your files here
          <input ref={inputRef} {...rest} type='file' />
        </DropZone>
      </Body>
    </Wrapper>
  );
});

export default FileUploader;
