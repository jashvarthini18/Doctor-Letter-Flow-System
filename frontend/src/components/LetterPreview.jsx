function LetterPreview({ content }) {

    return (
        <div className="preview-wrapper">

            <div
                className="a4-page"
                dangerouslySetInnerHTML={{
                    __html: content
                }}
            />

        </div>
    );
}

export default LetterPreview;