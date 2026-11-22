import json
from pathlib import Path

from pipeline.transcribe import parse_whisper_reply

FIXTURES = Path(__file__).resolve().parent / "fixtures"


def test_parse_whisper_reply_shifts_times_and_keeps_text():
    reply = json.loads((FIXTURES / "whisper_reply.json").read_text())

    segments = parse_whisper_reply(reply, offset=600)

    assert len(segments) == len(reply["segments"])
    first = segments[0]
    assert first.start == reply["segments"][0]["start"] + 600
    assert first.end == reply["segments"][0]["end"] + 600
    assert first.text == reply["segments"][0]["text"]
